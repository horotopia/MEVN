import { NextFunction, Request, Response, Router } from "express";
import { generateToken } from "../middlewares/jwt";
import { sessionMiddleware } from "../middlewares/session.middleware";
import validateCreateUser from "../middlewares/validator/validateUser";
import { Bcrypt, generateResetToken } from "../utils";
import { mailService } from "../services/mail.service";
import { findUser, findUserByVerificationToken, findUserByResetToken, updateUser, createUser } from "../models/user.interface";

export class AuthController {
  /**
   * @swagger
   * /api/auth/register:
   *   post:
   *     summary: Register a new user
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *               - email
   *               - tel
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 description: Email de l'utilisateur
   *               tel:
   *                 type: string
   *                 description: telephone de l'utilisateur
   *               password:
   *                 type: string
   *                 description: Mot de passe de l'utilisateur
   *             example:
   *               name: John Doe
   *               email: johndoe@example.com
   *               tel: 0102030405
   *               password: myPassword123
   *     responses:
   *       201:
   *         description: User registered successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                   description: JWT token de l'utilisateur
   *                 email:
   *                   type: string
   *                   description: Email de l'utilisateur
   *       400:
   *         description: Bad request
   *       409:
   *         description: Conflict
   *       500:
   *         description: Server error
   */
  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (
        !req.body ||
        typeof req.body.name !== "string" ||
        typeof req.body.email !== "string" ||
        typeof req.body.tel !== "string" ||
        typeof req.body.password !== "string"
      ) {
        res.status(400);
        throw new Error("Email and password are required");
      }

      const verificationToken = generateResetToken();
      const tokenExpiration = new Date();
      tokenExpiration.setHours(tokenExpiration.getHours() + 24);

      const bcryptInstance = new Bcrypt();

      const user = await createUser({
        name: req.body.name,
        email: req.body.email,
        tel: req.body.tel,
        password: await bcryptInstance.hashPassword(req.body.password),
        isEmailVerified: false,
        emailVerificationToken: verificationToken,
        emailVerificationTokenExpires: tokenExpiration
      });

      await mailService.sendTemplatedEmail({
        to: user.email,
        subject: 'Confirme ton inscription',
        template: 'confirmation',
        data: {
          username: user.name || 'Utilisateur',
          confirmationLink: `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`
        }
      });

      res.status(201).json({
        response: true,
        message: "Un email de confirmation vous a été envoyé"
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * @swagger
   * /api/auth/login:
   *   post:
   *     summary: Login a user
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 description: Email de l'utilisateur
   *               password:
   *                 type: string
   *                 description: Mot de passe de l'utilisateur
   *             example:
   *               email: johndoe@example.com
   *               password: myPassword123
   *     responses:
   *       200:
   *         description: User logged in successfully and Session created
   *       400:
   *         description: Invalid credentials
   *       404:
   *         description: User not found
   */
  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.body || typeof req.body.email !== "string" || typeof req.body.password !== "string") {
        res.status(400).json({
          message: "Email and password are required"
        });
        return;
      }

      const user = await findUser(req.body.email);

      if (!user) {
        res.status(401).json({
          message: "Invalid credentials"
        });
        return;
      }

      if (!user.isEmailVerified) {
        res.status(403).json({
          message: "Veuillez vérifier votre email avant de vous connecter"
        });
        return;
      }

      const bcryptInstance = new Bcrypt();
      const passwordMatch = await bcryptInstance.comparePassword(
        req.body.password,
        user.password
      );

      if (!passwordMatch) {
        res.status(401).json({
          message: "Invalid credentials"
        });
        return;
      }

      const jwtToken = generateToken(user);
      user.password = "";

      res.status(200).json({
        user: user,
        jwtToken: jwtToken
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        message: "Internal server error"
      });
    }
  };

  me = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.json(req.session!.user);
  };

  verifyEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { token } = req.query;

      const user = await findUserByVerificationToken(token as string);

      if (!user) {
        res.status(404);
        throw new Error("Token invalide");
      }

      if (!user.emailVerificationTokenExpires || user.emailVerificationTokenExpires < new Date()) {
        res.status(400);
        throw new Error("Token expiré");
      }

      await updateUser(user._id, {
        isEmailVerified: true,
        emailVerificationToken: null,
        emailVerificationTokenExpires: null
      });

      res.status(200).json({ message: "Email vérifié avec succès" });
    } catch (error) {
      next(error);
    }
  };

  forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email } = req.body;

      const user = await findUser(email);
      if (!user) {
        res.status(404).json({ message: "Aucun compte n'est associé à cette adresse email." });
        return;
      }

      const resetToken = generateResetToken();
      await updateUser(user._id, {
        resetPasswordToken: resetToken,
        resetPasswordExpires: new Date(Date.now() + 3600000) // Token valide 1 heure
      });

      const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
      await mailService.sendTemplatedEmail({
        to: email,
        subject: 'Réinitialisation de votre mot de passe',
        template: 'passwordReset',
        data: { resetLink }
      });

      res.status(200).json({ message: 'Email de réinitialisation envoyé avec succès.' });
    } catch (error) {
      console.error('Erreur lors de la demande de réinitialisation du mot de passe:', error);
      res.status(500).json({ message: 'Erreur lors de la demande de réinitialisation du mot de passe.' });
    }
  };

  resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { token, password } = req.body;

      const user = await findUserByResetToken(token);
      if (!user || !user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
        res.status(400).json({ message: 'Le lien de réinitialisation est invalide ou a expiré.' });
        return;
      }

      const bcryptInstance = new Bcrypt();
      const hashedPassword = await bcryptInstance.hashPassword(password);

      await updateUser(user._id, {
        password: hashedPassword,
        resetPasswordToken: undefined,
        resetPasswordExpires: undefined
      });

      res.status(200).json({ message: 'Mot de passe réinitialisé avec succès.' });
    } catch (error) {
      console.error('Erreur lors de la réinitialisation du mot de passe:', error);
      res.status(500).json({ message: 'Erreur lors de la réinitialisation du mot de passe.' });
    }
  };

  buildRouter(): Router {
    const router = Router();
    router.post("/register", validateCreateUser, this.register);
    router.post("/login", this.login);
    router.get("/me", sessionMiddleware(), this.me);
    router.get("/verify-email", this.verifyEmail);
    router.post("/forgot-password", this.forgotPassword);
    router.post("/reset-password", this.resetPassword);
    return router;
  }
}
