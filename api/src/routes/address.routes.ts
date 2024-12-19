import { Router } from "express";
import {
    getAddressesByUserId,
    postAddress,
    updateAddress,
    deleteAddress
} from "../controllers/address.controller";
import { authenticateToken } from "../middlewares/jwt";

const router = Router();

/**
 * @swagger
 * 
 * components:
 *   schemas:
 *     Addresses:
 *       required:
 *         - userId
 *         - street
 *         - city
 *         - postalCode
 *         - country
 *       properties:
 *         userId:
 *           type: string
 *           description: L'identifiant de l'utilisateur
 *         street:
 *           type: string
 *           description: La rue
 *         city:
 *           type: string
 *           description: La ville
 *         postalCode:
 *           type: string
 *           description: Le code postal
 *         country:
 *           type: string
 *           description: Le pays
 *       example:
 *         userId: 5f4f6d7e5e5c5b5a5a4a5a5a
 *         street: 5th Avenue
 *         city: New York
 *         postalCode: 10001
 *         country: USA
 */

/**
 * @swagger
 * /api/address/{userId}:
 *  get:
 *    summary: Get address by id
 *    tags: [Address]
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the user to get
 *    responses:
 *      200:
 *        description: List of address
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Addresses'
 *      500:
 *        description: Server error
 */
router.get("/:userId", authenticateToken, getAddressesByUserId);

/**
 * @swagger
 * /api/address:
 *  post:
 *    summary: Create a new address
 *    tags: [Address]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Addresses'
 *    responses:
 *      200:
 *        description: Create a new address
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Addresses'
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
router.post("/", authenticateToken, postAddress);

/**
 * @swagger
 * /api/address:
 *  put:
 *    summary: Update an address
 *    tags: [Address]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Addresses'
 *    responses:
 *      200:
 *        description: Update an address
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Addresses'
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
router.put("/:id", authenticateToken, updateAddress);

/**
 * @swagger
 * /api/address:
 *  delete:
 *    summary: Delete an address
 *    tags: [Address]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Addresses'
 *    responses:
 *      200:
 *        description: Delete an address
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Addresses'
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
router.delete("/:id", authenticateToken, deleteAddress);

export default router;
