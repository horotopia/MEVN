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

const router = Router();

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
router.delete("/d/:id", authenticateToken, validateObjectId, deleteProduct);

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
router.get("/all", authenticateToken, getProducts);

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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *           example:
 *             name: Pikachu
 *             description: Pokémon électrique
 *             type: électricité
 *             evolutionLevel: 2
 *             evolutionReference: Pichu
 *             weight: 6000
 *             height: 40
 *             age: 4
 *             price: 50000
 *             category: pokémon
 *             stock: 5
 *     responses:
 *       200:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
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
router.post("/create", authenticateToken, postProduct);

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
router.put("/u/:id", authenticateToken, putProduct);

export default router;
