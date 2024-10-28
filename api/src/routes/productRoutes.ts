import { Router } from "express";
import {
  deleteProduct,
  getProduct,
  getProducts,
  getProductsByCategory,
  getProductsByEvolutionLevel,
  getProductsByType,
  getProductsInStock,
  postProduct,
  putProduct,
} from "../controllers/productController";
import { authenticateToken } from "../middlewares/jwt";
import { validateObjectId } from "../middlewares/validate";
import validateRoleAdmin from "../middlewares/validator/validateRole";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Products:
 *       type: object
 *   required:
 *     - name
 *     - description
 *     - type
 *     - evolutionLevel
 *     - evolutionReference
 *     - weight
 *     - height
 *     - age
 *     - price
 *     - category
 *     - stock
 *     - createdAt
 *     - updatedAt
 *   properties:
 *     name:
 *       type: string
 *       description: Le nom du produit
 *       required: true
 *       trim: true
 *       maxLength: 100
 *     description:
 *       type: string
 *       description: La description du produit
 *       required: true
 *       maxLength: 500
 *     type:
 *       type: string
 *       description: Le type du produit
 *       required: true
 *       enum: [feu, eau, plante, électricité]
 *       default: feu
 *     evolutionLevel:
 *       type: number
 *       description: Le niveau d'évolution du produit
 *       required: true
 *       min: 1
 *       max: 3
 *     evolutionReference:
 *       type: string
 *       description: La référence de l'évolution du produit
 *       required: true
 *       trim: true
 *       maxLength: 100
 *     weight:
 *       type: number
 *       description: Le poids du produit en grammes
 *       required: true
 *       min: 0
 *     height:
 *       type: number
 *       description: La taille du produit en centimètres
 *       required: true
 *       min: 0
 *     age:
 *       type: number
 *       description: L'âge du produit
 *       required: true
 *       min: 0
 *     price:
 *       type: number
 *       description: Le prix du produit en €
 *       required: true
 *       min: 0
 *     category:
 *       type: string
 *       description: La catégorie du produit
 *       required: true
 *       enum: [pokémon, pokéball, baie, objets, médicaments]
 *       default: pokémon
 *     stock:
 *       type: number
 *       description: Le stock du produit
 *       default: 0
 *     createdAt:
 *       type: Date
 *       description: La date de création du produit
 *       default: Date.now
 *     updatedAt:
 *       type: Date
 *       description: La date de modification du produit
 *       default: Date.now
 *   example:
 *     name: Pikachu
 *     description: Pokémon électrique
 *     type: électricité
 *     evolutionLevel: 2
 *     evolutionReference: Pichu
 *     weight: 6000
 *     height: 40
 *     age: 4
 *     price: 50_000
 *     category: pokémon
 *     stock: 5
 *     createdAt: 2021-09-01T00:00:00.000Z
 *     updatedAt: 2021-09-01T00:00:00.000Z
 */

/**
 * @swagger
 * /api/product/d/{id}:
 *   delete:
 *     summary: Supprime un produit par son identifiant
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product to get
 *     responses:
 *       200:
 *         description: Product deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/d/:id",
  authenticateToken,
  validateObjectId,
  validateRoleAdmin,
  deleteProduct
);

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Get product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product to get
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", authenticateToken, validateObjectId, getProduct);

/**
 * @swagger
 * /api/product/all:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.get("/all", authenticateToken, validateRoleAdmin, getProducts);

/**
 * @swagger
 * /api/product/c/{category}:
 *   get:
 *     summary: Get all products of a category
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.get("/c/:category", authenticateToken, getProductsByCategory);

/**
 * @swagger
 * /api/product/e/{evolutionLevel}:
 *   get:
 *     summary: Get all products of an evolution level
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.get(
  "/e/:evolutionLevel",
  authenticateToken,
  getProductsByEvolutionLevel
);

/**
 * @swagger
 * /api/product/t/{type}:
 *   get:
 *     summary: Get all products of a type
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.get("/t/:type", authenticateToken, getProductsByType);

/**
 * @swagger
 * /api/product/stock:
 *   get:
 *     summary: Get all products in stock
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.get("/stock", authenticateToken, getProductsInStock);

/**
 * @swagger
 * /api/product/create:
 *   post:
 *     summary: create a product
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.post("/create", authenticateToken, validateRoleAdmin, postProduct);

/**
 * @swagger
 * /api/product/u/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product to get
 *     responses:
 *       200:
 *         description: Product updated
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.put("/u/:id", authenticateToken, validateRoleAdmin, putProduct);

export default router;
