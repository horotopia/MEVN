import { Router } from 'express';
import {
    getPicturesByUserId,
    getPictureById,
    createPicture,
    updatePicture,
    deletePicture
} from '../controllers/pictures.controller';
import { authenticateToken } from '../middlewares/jwt';
import { validateObjectId } from '../middlewares/validate';

const router = Router();

/**
 * @swagger
 * 
 * components:
 *   schemas:
 *     Pictures:
 *       required:
 *         - userId
 *         - name
 *         - description
 *       properties:
 *         userId:
 *           type: string
 *           description: L'identifiant de l'utilisateur
 *         name:
 *           type: string
 *           description: Le nom de l'image
 *         description:
 *           type: string
 *           description: La description de l'image
 *       example:
 *         userId: 5f4f6d7e5e5c5b5a5a4a5a5a
 *         name: image.jpg
 *         description: Une image de test
 */

/**
 * @swagger
 * /api/orders/user/{userId}:
 *  get:
 *    summary: Get orders by user id
 *    tags: [Pictures]
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the orders to get
 *    responses:
 *      200:
 *        description: Get orders by user id
 *        content:
 *          application/json:
 *          schema:
 *            $ref: '#/components/schemas/Pictures'
 *      500:
 *        description: Server error
 */
router.get('/user/:id', authenticateToken, validateObjectId, getPicturesByUserId);

/**
 * @swagger
 * /api/pictures/{id}:
 *  get:
 *    summary: Get picture by id
 *    tags: [Pictures]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the orders to get
 *    responses:
 *      200:
 *        description: Get picture by id
 *        content:
 *          application/json:
 *          schema:
 *            $ref: '#/components/schemas/Pictures'
 *      500:
 *        description: Server error
 */
router.get('/:id', authenticateToken, validateObjectId, getPictureById);

/**
 * @swagger
 * /api/pictures:
 *  post:
 *    summary: Create picture
 *    tags: [Pictures]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Pictures'
 *    responses:
 *      200:
 *        description: Create picture
 *        content:
 *          application/json:
 *          schema:
 *            $ref: '#/components/schemas/Pictures'
 *      500:
 *        description: Server error
 */
router.post('/', authenticateToken, createPicture);

/**
 * @swagger
 * /api/pictures/{id}:
 *  put:
 *    summary: Update picture
 *    tags: [Pictures]
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
 *              $ref: '#/components/schemas/Pictures'
 *    responses:
 *      200:
 *        description: Update picture
 *        content:
 *          application/json:
 *          schema:
 *            $ref: '#/components/schemas/Pictures'
 *      500:
 *        description: Server error
 */
router.put('/:id', authenticateToken, validateObjectId, updatePicture);

/**
 * @swagger
 * /api/pictures/{id}:
 *  delete:
 *    summary: delete picture
 *    tags: [Pictures]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the orders to get
 *    responses:
 *      200:
 *        description: Delete picture
 *        content:
 *          application/json:
 *          schema:
 *            $ref: '#/components/schemas/Pictures'
 *      500:
 *        description: Server error
 */
router.delete('/:id', authenticateToken, validateObjectId, deletePicture);

export default router;
