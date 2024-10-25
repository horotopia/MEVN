import { Router } from 'express';
import { getOrdersByUserId,
    getOrderById,
    createOrders,
    updateOrders,
    deleteOrders
} from '../controllers/ordersController';
import { authenticateToken } from '../middlewares/jwt';
import { validateObjectId } from '../middlewares/validate';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Orders:
 *       required:
 *         - userId
 *         - items
 *         - totalAmount
 *         - status
 *       properties:
 *         userId:
 *           type: string
 *           description: L'identifiant de l'utilisateur
 *         items:
 *           type: object
 *           description: Les produits de la commande
 *         totalAmount:
 *           type: number
 *           description: Le montant total de la commande
 *         status:
 *           type: string
 *           description: Le statut de la commande
 *       example:
 *         userId: 5f4f6d7e5e5c5b5a5a4a5a5a
 *         items: [
 *           {
 *             productId: 5f4f6d7e5e5c5b5a5a4a5a5a,
 *             quantity: 2,
 *             price: 10
 *           }
 *         ]
 *         totalAmount: 20
 *         status: pending
 */

/**
 * @swagger
 * /api/orders/user/{userId}:
 *  get:
 *    summary: Get orders by user id
 *    tags: [Orders]
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the orders to get
 *    responses:
 *      200:
 *        description: User orders
 *        content:
 *          application/json:
 *          schema:
 *            $ref: '#/components/schemas/Oders'
 *      500:
 *        description: Server error
 */
router.get('/user/:id', authenticateToken, validateObjectId, getOrdersByUserId);

/**
 * @swagger
 * /api/orders/{id}:
 *  get:
 *    summary: Get orders by id
 *    tags: [Orders]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the orders to get
 *    responses:
 *      200:
 *        description: Orders by id
 *        content:
 *          application/json:
 *          schema:
 *            $ref: '#/components/schemas/Oders'
 *      500:
 *        description: Server error
 */
router.get('/:id', authenticateToken, validateObjectId, getOrderById);

/**
 * @swagger
 * /api/orders:
 *  post:
 *    summary: Create orders
 *    tags: [Orders]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Oders'
 *    responses:
 *      200:
 *        description: Create orders
 *        content:
 *          application/json:
 *          schema:
 *            $ref: '#/components/schemas/Oders'
 *      500:
 *        description: Server error
 */
router.post('/', authenticateToken, createOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *  put:
 *    summary: Update orders
 *    tags: [Orders]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the orders to get
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Oders'
 *    responses:
 *      200:
 *        description: Update orders
 *        content:
 *          application/json:
 *          schema:
 *            $ref: '#/components/schemas/Oders'
 *      500:
 *        description: Server error
 */
router.put('/:id', authenticateToken, validateObjectId, updateOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *  delete:
 *    summary: Delete orders
 *    tags: [Orders]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the orders to get
 *    responses:
 *      200:
 *        description: Delete orders
 *        content:
 *          application/json:
 *          schema:
 *            $ref: '#/components/schemas/Oders'
 *      500:
 *        description: Server error
 */
router.delete('/:id', authenticateToken, validateObjectId, deleteOrders);

export default router;
