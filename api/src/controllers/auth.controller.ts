import { NextFunction, Request, Response, Router } from "express";
import { generateToken } from "../middlewares/jwt";
import { sessionMiddleware } from "../middlewares/session.middleware";
import validateCreateUser from "../middlewares/validator/validateUser";
import { MongooseService } from "../services/mongoose";
import { Bcrypt } from "../utils";

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
      const bcryptInstance = new Bcrypt();
      const mongooseService = await MongooseService.get();
      const user = await mongooseService.userService.createUser({
        name: req.body.name,
        email: req.body.email,
        tel: req.body.tel,
        password: await bcryptInstance.hashPassword(req.body.password),
      });
      
      const session = await mongooseService.sessionService.createSession({
        user: user,
        userAgent: req.header("user-agent") || "unknown",
        expirationDate: new Date(new Date().getTime() + 1_296_000_000),
      });
      

      // Create token
      const jwtToken = generateToken(user);

      user.password = "";

      res
        .status(201)
        .json({
          user: user,
          jwtToken: jwtToken
        })
    } catch (error) {
      if (
        error instanceof Error &&
        error.name === "MongoServerError" &&
        error.message.startsWith("E11000 duplicate key")
      ) {
        res.status(409);
      }
      if (!res.statusCode) {
        res.status(500);
      }
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
      if (
        !req.body ||
        typeof req.body.email !== "string" ||
        typeof req.body.password !== "string"
      ) {
        res.status(400);
        throw new Error("Email and password are required");
      }
      const bcryptInstance = new Bcrypt();
      const mongooseService = await MongooseService.get();

      const user = await mongooseService.userService.findUser(req.body.email);
      if (user === null) {
        res.status(401);
        throw new Error("Invalid credentials");
      }
      const passwordMatch = await bcryptInstance.comparePassword(
        req.body.password,
        user.password
      );
      if (!passwordMatch) {
        res.status(401);
        throw new Error("Invalid credentials 2");
      }
      const session = await mongooseService.sessionService.createSession({
        user: user,
        userAgent: req.header("user-agent") || "unknown",
        expirationDate: new Date(new Date().getTime() + 1_296_000_000),
      });

      const jwtToken = generateToken(user);

      user.password = "";

      res
        .status(201)
        .json({
          user: user,
          jwtToken: jwtToken
        });
    } catch (error) {
      // si status code n'est pas défini on renvoie une erreur 500
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  async me(req: Request, res: Response) {
    res.json(req.session!.user);
  }

  buildRouter(): Router {
    const router = Router();
    router.post("/register", validateCreateUser, this.register.bind(this));
    router.post("/login", this.login.bind(this));
    router.get("/me", sessionMiddleware(), this.me.bind(this));
    return router;
  }
}
