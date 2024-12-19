import { Router } from 'express';
import {
    getAvisByUserId,
    getAvisById,
    createAvis,
    updateAvis,
    deleteAvis
} from "../controllers/avis.controller";
import { authenticateToken } from "../middlewares/jwt";
import { validateObjectId } from '../middlewares/validate';

const router = Router();

/**
 * @swagger
 * 
 * components:
 *   schemas:
 *     Avis:
 *       required:
 *         - userId
 *         - productId
 *         - rating
 *         - comment
 *       properties:
 *         userId:
 *           type: string
 *           description: L'identifiant de l'utilisateur
 *         productId:
 *           type: string
 *           description: L'identifiant du produit
 *         rating:
 *           type: number
 *           description: La note donnée par l'utilisateur
 *         comment:
 *           type: string
 *           description: Le commentaire de l'utilisateur
 *         createdAt:
 *           type: string
 *           description: La date de création de l'avis
 *         updatedAt:
 *           type: string
 *           description: La date de mise à jour de l'avis
 */

/**
 * @swagger
 * /api/avis/user/{userId}:
 *  get:
 *    summary: Get avis by user id
 *    tags: [Avis]
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
 *            $ref: '#/components/schemas/Avis'
 *      500:
 *        description: Server error
 */
router.get('/user/:id', authenticateToken, validateObjectId, getAvisByUserId);

/**
 * @swagger
 * /api/avis/{id}:
 *  get:
 *    summary: Get avis by id
 *    tags: [Avis]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the user to get
 *    responses:
 *      200:
 *        description: Get avis by id
 *        content:
 *          application/json:
 *          schema:
 *            $ref: '#/components/schemas/Avis'
 *      500:
 *        description: Server error
 */
router.get('/:id', authenticateToken, validateObjectId, getAvisById);

/**
 * @swagger
 * /api/avis/{id}:
 *  post:
 *    summary: Create avis
 *    tags: [Avis]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Avis'
 *    responses:
 *      200:
 *        description: Create avis
 *        content:
 *          application/json:
 *          schema:
 *            $ref: '#/components/schemas/Avis'
 *      500:
 *        description: Server error
 */
router.post('/', authenticateToken, createAvis);

/**
 * @swagger
 * /api/avis/{id}:
 *  put:
 *    summary: Update avis by id
 *    tags: [Avis]
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
 *              $ref: '#/components/schemas/Avis'
 *    responses:
 *      200:
 *        description: Update avis
 *        content:
 *          application/json:
 *          schema:
 *            $ref: '#/components/schemas/Avis'
 *      500:
 *        description: Server error
 */
router.put('/:id', authenticateToken, validateObjectId, updateAvis);

/**
 * @swagger
 * /api/avis/{id}:
 *  delete:
 *    summary: Delete avis by id
 *    tags: [Avis]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the avis to delete
 *    responses:
 *      200:
 *        description: Delete avis
 *        content:
 *          application/json:
 *          schema:
 *            $ref: '#/components/schemas/Avis'
 *      500:
 *        description: Server error
 */
router.delete('/:id', authenticateToken, validateObjectId, deleteAvis);

export default router;
