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
 *     Product:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the product
 *         description:
 *           type: string
 *           description: The description of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *         image:
 *           type: string
 *           description: The image of the product
 *       example:
 *         name: Product 1
 *         description: Description of product 1
 *         price: 10
 *         image: image1.png
 */

/**
 * @swagger
 * /api/d/{id}:
 * get:
 *   summary: Delete product by id
 *   tags: [Products]
 *   responses:
 *     200:
 *       description: Product deleted
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *     400:
 *       description: Bad request
 *     401:
 *       description: Unauthorized
 *     403:
 *       description: Forbidden
 *     404:
 *       description: Not found
 *     500:
 *       description: Internal server error
 */
router.deleteProduct(
  "/d/:id",
  authenticateToken,
  validateObjectId,
  validateRoleAdmin,
  deleteProduct
);

/**
 * @swagger
 * /api/{id}:
 * get:
 *   summary: Get product by id
 *   tags: [Products]
 *   responses:
 *     200:
 *       description: Product found
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *     400:
 *       description: Bad request
 *     401:
 *       description: Unauthorized
 *     403:
 *       description: Forbidden
 *     404:
 *       description: Not found
 *     500:
 *       description: Internal server error
 */
router.getProduct("/:id", authenticateToken, validateObjectId, getProduct);

/**
 * @swagger
 * /apiroducts:
 * get:
 *   summary: Get all products
 *   tags: [Products]
 *   responses:
 *     200:
 *       description: List of products
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *     400:
 *       description: Bad request
 *     401:
 *       description: Unauthorized
 *     403:
 *       description: Forbidden
 *     404:
 *       description: Not found
 *     500:
 *       description: Internal server error
 */
router.getProducts("/all", authenticateToken, validateRoleAdmin, getProducts);

/**
 * @swagger
 * /api/c/{category}:
 * get:
 *   summary: Get all products of a category
 *   tags: [Products]
 *   responses:
 *     200:
 *       description: List of products
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *     400:
 *       description: Bad request
 *     401:
 *       description: Unauthorized
 *     403:
 *       description: Forbidden
 *     404:
 *       description: Not found
 *     500:
 *       description: Internal server error
 */
router.getProductsByCategory(
  "/c/:category",
  authenticateToken,
  getProductsByCategory
);

/**
 * @swagger
 * /api/e/{evolutionLevel}:
 * get:
 *   summary: Get all products of an evolution level
 *   tags: [Products]
 *   responses:
 *     200:
 *       description: List of products
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *     400:
 *       description: Bad request
 *     401:
 *       description: Unauthorized
 *     403:
 *       description: Forbidden
 *     404:
 *       description: Not found
 *     500:
 *       description: Internal server error
 */
router.getProductsByEvolutionLevel(
  "/e/:evolutionLevel",
  authenticateToken,
  getProductsByEvolutionLevel
);

/**
 * @swagger
 * /api/t/{type}:
 * get:
 *   summary: Get all products of a type
 *   tags: [Products]
 *   responses:
 *     200:
 *       description: List of products
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *     400:
 *       description: Bad request
 *     401:
 *       description: Unauthorized
 *     403:
 *       description: Forbidden
 *     404:
 *       description: Not found
 *     500:
 *       description: Internal server error
 */
router.getProductsByType("/t/:type", authenticateToken, getProductsByType);

/**
 * @swagger
 * /api/stock:
 * get:
 *   summary: Get all products in stock
 *   tags: [Products]
 *   responses:
 *     200:
 *       description: List of products
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *     400:
 *       description: Bad request
 *     401:
 *       description: Unauthorized
 *     403:
 *       description: Forbidden
 *     404:
 *       description: Not found
 *     500:
 *       description: Internal server error
 */
router.getProductsInStock("/stock", authenticateToken, getProductsInStock);

/**
 * @swagger
 * /api/create:
 * get:
 *   summary: create a product
 *   tags: [Products]
 *   responses:
 *     200:
 *       description: Product created
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *     400:
 *       description: Bad request
 *     401:
 *       description: Unauthorized
 *     403:
 *       description: Forbidden
 *     404:
 *       description: Not found
 *     500:
 *       description: Internal server error
 */
router.postProduct(
  "/create",
  authenticateToken,
  validateRoleAdmin,
  postProduct
);

/**
 * @swagger
 * /apiroducts:
 * get:
 *   summary: Update a product
 *   tags: [Products]
 *   responses:
 *     200:
 *       description: Product updated
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *     400:
 *       description: Bad request
 *     401:
 *       description: Unauthorized
 *     403:
 *       description: Forbidden
 *     404:
 *       description: Not found
 *     500:
 *       description: Internal server error
 */
router.putProduct("/u/:id", authenticateToken, validateRoleAdmin, putProduct);

export default router;
