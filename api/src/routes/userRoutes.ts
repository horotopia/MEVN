import { Router, Request, Response } from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  postUser,
  putUser,
} from "../controllers/userController";
import mongoose from "mongoose";
import { authenticateToken } from "../middlewares/jwt";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Le nom de l'utilisateur
 *         email:
 *           type: string
 *           description: L'email de l'utilisateur
 *         password:
 *           type: string
 *           description: Le mot de passe de l'utilisateur
 *         role:
 *           type: string
 *           enum: [ROLE_USER, ROLE_STORE_KEEPER, ROLE_ADMIN, ROLE_COMPTA]
 *           default: ROLE_USER
 *       example:
 *         name: John Doe
 *         email: john.doe@email.fr
 *         password: password
 *         role: ROLE_USER
 */

const validateObjectId = (req: Request, res: Response, next: Function) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Invalid ID format' });
  }
  next();
};

/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: Get all users
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: List of users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 *      403:
 *        description: Forbidden
 *      404:
 *        description: Not found
 *      500:
 *        description: Server error
 */
router.get("/", authenticateToken, getUsers);

/**
 * @swagger
 * /api/users:
 *  post:
 *    summary: Create a new user
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: List of users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 *      403:
 *        description: Forbidden
 *      404:
 *        description: Not found
 *      500:
 *        description: Server error
 */
router.post("/", authenticateToken, postUser);

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *    summary: Get user by id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the user to get
 *    responses:
 *      200:
 *        description: List of users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 *      403:
 *        description: Forbidden
 *      404:
 *        description: Not found
 *      500:
 *        description: Server error
 */
router.get("/:id", authenticateToken, validateObjectId, getUser);

/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *    summary: Update user by id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the user to get
 *    responses:
 *      200:
 *        description: List of users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 *      403:
 *        description: Forbidden
 *      404:
 *        description: Not found
 *      500:
 *        description: Server error
 */
router.put("/:id", authenticateToken, validateObjectId, putUser);

/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *    summary: Delete user by id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the user to get
 *    responses:
 *      200:
 *        description: List of users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 *      400:
 *        description: Bad request
 *      401:
 *        description: Unauthorized
 *      403:
 *        description: Forbidden
 *      404:
 *        description: Not found
 *      500:
 *        description: Server error
 */
router.delete("/:id", authenticateToken, validateObjectId, deleteUser);

export default router;
