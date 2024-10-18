import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import hashPassword from "../middlewares/bcrypt.js";
import { validateNoToken } from "../middlewares/validate.js";
import validateUser from "../middlewares/validator/validateUser.js";
const userRouter = express.Router();

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
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom de l'utilisateur
 *               email:
 *                 type: string
 *                 description: Email de l'utilisateur
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'utilisateur
 *             example:
 *               name: John Doe
 *               email: johndoe@example.com
 *               password: mypassword
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
 *       400:
 *         description: Bad request
 *       401:
 *         description: Échec de l'authentification
 *       500:
 *         description: Server error
 */
userRouter.post("/register", validateUser, validateNoToken, hashPassword, registerUser);

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
 *               password: mypassword
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
userRouter.post("/login", validateNoToken, loginUser);

export default userRouter;
