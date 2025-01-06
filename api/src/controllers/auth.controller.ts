import { NextFunction, Request, Response, Router } from "express";
import { generateToken } from "../middlewares/jwt";
import { sessionMiddleware } from "../middlewares/session.middleware";
import validateCreateUser from "../middlewares/validator/validateUser";
import { MongooseService } from "../services/mongoose";
import { Bcrypt } from "../utils";
import crypto from 'crypto';
import { mailService } from "../services/mail.service";

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
  async register(req: Request, res: Response, next: NextFunction) {
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

      const verificationToken = crypto.randomBytes(32).toString('hex');
      const tokenExpiration = new Date();
      tokenExpiration.setHours(tokenExpiration.getHours() + 24);

      const bcryptInstance = new Bcrypt();
      const mongooseService = await MongooseService.get();
      const user = await mongooseService.userService.createUser({
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
          confirmationLink: `http://localhost:3000/verify-email?token=${verificationToken}`
        }
      });

      res.status(201).json({
        response: true,
        message: "Un email de confirmation vous a été envoyé"
      });
    } catch (error) {
      next(error);
    }
  }

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
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body || typeof req.body.email !== "string" || typeof req.body.password !== "string") {
        res.status(400).json({
          message: "Email and password are required"
        });
        return;
      }

      const mongooseService = await MongooseService.get();
      const user = await mongooseService.userService.findUser(req.body.email);

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

      const session = await mongooseService.sessionService.createSession({
        user: user,
        userAgent: req.header("user-agent") || "unknown",
        expirationDate: new Date(new Date().getTime() + 1_296_000_000),
      });

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
  }

  async me(req: Request, res: Response) {
    res.json(req.session!.user);
  }

  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.query;

      const mongooseService = await MongooseService.get();
      const user = await mongooseService.userService.findUserByVerificationToken(token as string);

      if (!user) {
        res.status(404);
        throw new Error("Token invalide");
      }

      if (!user.emailVerificationTokenExpires || user.emailVerificationTokenExpires < new Date()) {
        res.status(400);
        throw new Error("Token expiré");
      }

      await mongooseService.userService.updateUser(user._id, {
        isEmailVerified: true,
        emailVerificationToken: null,
        emailVerificationTokenExpires: null
      });

      res.status(200).json({ message: "Email vérifié avec succès" });
    } catch (error) {
      next(error);
    }
  }

  buildRouter(): Router {
    const router = Router();
    router.post("/register", validateCreateUser, this.register.bind(this));
    router.post("/login", this.login.bind(this));
    router.get("/me", sessionMiddleware(), this.me.bind(this));
    router.get("/verify-email", this.verifyEmail.bind(this));
    return router;
  }
}
