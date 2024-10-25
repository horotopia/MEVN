import { Router } from 'express';
import { getFavorisByUserId,
    getFavorisById,
    createFavoris,
    updateFavoris,
    deleteFavoris
} from '../controllers/favorisController';
import { authenticateToken } from '../middlewares/jwt';
import { validateObjectId } from '../middlewares/validate';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Favoris:
 *       required:
 *         - userId
 *         - productId
 *       properties:
 *         userId:
 *           type: string
 *           description: L'identifiant de l'utilisateur
 *         productId:
 *           type: string
 *           description: L'identifiant du produit
 *       example:
 *         userId: 5f4f6d7e5e5c5b5a5a4a5a5a
 *         productId: 5f4f6d7e5e5c5b5a5a4a5a5a
 */

/**
 * @swagger
 * /api/favoris/user/{userId}:
 *  get:
 *    summary: Get favoris by user id
 *    tags: [Favoris]
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the favoris to get
 *    responses:
 *      200:
 *        description: Get favoris by user id
 *        content:
 *          application/json:
 *          schema:
 *            $ref: '#/components/schemas/Favoris'
 *      500:
 *        description: Server error
 */
router.get('/user/:id', authenticateToken, validateObjectId, getFavorisByUserId);

/**
 * @swagger
 * /api/favoris/{id}:
 *  get:
 *    summary: Get favoris by id
 *    tags: [Favoris]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the favoris to get
 *    responses:
 *      200:
 *        description: Update cart
 *        content:
 *          application/json:
 *          schema:
 *            $ref: '#/components/schemas/Favoris'
 *      500:
 *        description: Server error
 */
router.get('/:id', authenticateToken, validateObjectId, getFavorisById);

/**
 * @swagger
 * /api/favoris:
 *  post:
 *    summary: Create favoris
 *    tags: [Favoris]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Favoris'
 *    responses:
 *      200:
 *        description: Create favoris
 *        content:
 *          application/json:
 *          schema:
 *            $ref: '#/components/schemas/Favoris'
 *      500:
 *        description: Server error
 */
router.post('/', authenticateToken, createFavoris);

/**
 * @swagger
 * /api/favoris/{id}:
 *  put:
 *    summary: Update favoris by id
 *    tags: [Favoris]
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
 *              $ref: '#/components/schemas/Favoris'
 *    responses:
 *      200:
 *        description: Update cart
 *        content:
 *          application/json:
 *          schema:
 *            $ref: '#/components/schemas/Favoris'
 *      500:
 *        description: Server error
 */
router.put('/:id', authenticateToken, validateObjectId, updateFavoris);

/**
 * @swagger
 * /api/favoris/{id}:
 *  delete:
 *    summary: Delete favoris by id
 *    tags: [Favoris]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the avis to update
 *    responses:
 *      200:
 *        description: Delete favoris
 *        content:
 *          application/json:
 *          schema:
 *            $ref: '#/components/schemas/Favoris'
 *      500:
 *        description: Server error
 */
router.delete('/:id', authenticateToken, validateObjectId, deleteFavoris);

export default router;
