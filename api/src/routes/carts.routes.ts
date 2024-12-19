import { Router } from 'express';
import { getCartsByUserId,
    getCartById,
    createCart,
    updateCart,
    deleteCart
} from '../controllers/cart.controller';
import { authenticateToken } from "../middlewares/jwt";
import { validateObjectId } from '../middlewares/validate';
import swagger from '../config/swagger';

const router = Router();

/**
 * @swagger
 * 
 * components:
 *   schemas:
 *     Cart:
 *       required:
 *         - userId
 *         - items
 *       properties:
 *         userId:
 *           type: string
 *           description: L'identifiant de l'utilisateur
 *         items:
 *           type: object
 *           description: Les produits du panier
 *       example:
 *         userId: 5f4f6d7e5e5c5b5a5a4a5a5a
 *         items: [
 *           {
 *             productId: 5f4f6d7e5e5c5b5a5a4a5a5a,
 *             quantity: 2
 *           }
 *         ]
 */

/**
 * @swagger
 * /api/cart/user/{userId}:
 *  get:
 *    summary: Get avis by user id
 *    tags: [Cart]
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the user to get
 *    responses:
 *      200:
 *        description: Get avis by user id
 *        content:
 *          application/json:
 *          schema:
 *            $ref: '#/components/schemas/Cart'
 *      500:
 *        description: Server error
 */
router.get('/user/:id', authenticateToken, validateObjectId, getCartsByUserId);

/**
 * @swagger
 * /api/cart/{id}:
 *  get:
 *    summary: Get cart by id
 *    tags: [Cart]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the cart to get
 *    responses:
 *      200:
 *        description: Get cart by id
 *        content:
 *          application/json:
 *          schema:
 *            $ref: '#/components/schemas/Cart'
 *      500:
 *        description: Server error
 */
router.get('/:id', authenticateToken, validateObjectId, getCartById);

/**
 * @swagger
 * /api/cart/{id}:
 *  post:
 *    summary: Create cart
 *    tags: [Cart]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Cart'
 *    responses:
 *      200:
 *        description: Create cart
 *        content:
 *          application/json:
 *          schema:
 *            $ref: '#/components/schemas/Cart'
 *      500:
 *        description: Server error
 */
router.post('/', authenticateToken, createCart);

/**
 * @swagger
 * /api/cart/{id}:
 *  put:
 *    summary: Update cart by id
 *    tags: [Cart]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the avis to update
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Cart'
 *    responses:
 *      200:
 *        description: Update cart
 *        content:
 *          application/json:
 *          schema:
 *            $ref: '#/components/schemas/Cart'
 *      500:
 *        description: Server error
 */
router.put('/:id', authenticateToken, validateObjectId, updateCart);

/**
 * @swagger
 * /api/cart/{id}:
 *  delete:
 *    summary: Delete cart by id
 *    tags: [Cart]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the cart to delete
 *    responses:
 *      200:
 *        description: Delete cart
 *        content:
 *          application/json:
 *          schema:
 *            $ref: '#/components/schemas/Cart'
 *      500:
 *        description: Server error
 */
router.delete('/:id', authenticateToken, validateObjectId, deleteCart);

export default router;
