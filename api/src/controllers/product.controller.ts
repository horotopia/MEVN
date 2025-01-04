import { NextFunction, Request, Response, Router } from "express";
import { authenticateToken } from "../middlewares/jwt";
import {
  validateAttributeAndValue,
  validateObjectId,
} from "../middlewares/validate";
import { validateRoleAdmin } from "../middlewares/validator/validateRole";
import { MongooseService } from "../services/mongoose/mongoose.service";

export class ProductController {
  /**
   * @swagger
   * /api/product/:
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
   *             type: électrique
   *             evolutionLevel: 2
   *             evolutionReference: Pichu
   *             weight: 6000
   *             height: 40
   *             age: 4
   *             price: 50000
   *             category: pokémon
   *             stock: 5
   *     responses:
   *       201:
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
   *       409:
   *         description: Conflict
   *       500:
   *         description: Internal server error
   */
  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      if (
        !req.body ||
        !req.body.name ||
        !req.body.description ||
        !req.body.type ||
        !req.body.evolutionLevel ||
        !req.body.evolutionReference ||
        !req.body.weight ||
        !req.body.height ||
        !req.body.age ||
        !req.body.price ||
        !req.body.category ||
        !req.body.stock
      ) {
        res.status(400);
        throw new Error("Missing required fields");
      }
      const mongooseService = await MongooseService.get();
      const product = await mongooseService.productService.createProduct({
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        evolutionLevel: req.body.evolutionLevel,
        evolutionReference: req.body.evolutionReference,
        weight: req.body.weight,
        height: req.body.height,
        age: req.body.age,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock,
      });
      res.status(201).json(product);
    } catch (error) {
      if (
        error instanceof Error &&
        error.name === "MongooseError" &&
        error.message.startsWith("E11000 duplicate key")
      ) {
        res.status(409);
      }
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

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
  async getOneProduct(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params || !req.params.id) {
        res.status(400);
        throw new Error("Missing required fields");
      }
      const mongooseService = await MongooseService.get();
      const product = await mongooseService.productService.findProductById(
        req.params.id
      );
      if (!product) {
        res.status(404);
        throw new Error("Product not found");
      }
      res.status(200).json(product);
      return;
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  /**
   * @swagger
   * /api/product/:
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
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Not found
   *       500:
   *         description: Internal server error
   */
  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const mongooseService = await MongooseService.get();
      const products = await mongooseService.productService.findAllProducts();
      res.status(200).json(products);
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  /**
   * @swagger
   * /api/product/{attribute}/{value}:
   *   get:
   *     summary: Get product by attribute
   *     tags: [Products]
   *     parameters:
   *       - in: path
   *         name: attribute
   *         schema:
   *           type: string
   *         required: true
   *         description: Attribute to search
   *       - in: path
   *         name: value
   *         schema:
   *           type: string
   *         required: true
   *         description: Value of the attribute
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
  async getProductByAttribute(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.attribute || !req.params.value) {
        res.status(400);
        throw new Error("Missing required fields");
      }
      const mongooseService = await MongooseService.get();
      const products =
        await mongooseService.productService.findProductsByAttribute(
          req.params.attribute,
          req.params.value
        );
      if (!products) {
        res.status(404);
        throw new Error("Product not found");
      }
      res.status(200).json(products);
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  /**
   * @swagger
   * /api/product/{id}:
   *   put:
   *     summary: Update a product
   *     tags: [Products]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the product to update
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
   *         description: Product updated
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
  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id || !req.body) {
        res.status(400);
        throw new Error("Missing required fields");
      }
      const mongooseService = await MongooseService.get();
      const product = await mongooseService.productService.updateProduct(
        req.params.id,
        req.body
      );
      if (!product) {
        res.status(404);
        throw new Error("Product not found");
      }
      res.status(200).json(product);
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  /**
   * @swagger
   * /api/product/{id}:
   *   delete:
   *     summary: Delete a product
   *     tags: [Products]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the product to delete
   *     responses:
   *       200:
   *         description: Product deleted
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
  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        res.status(400);
        throw new Error("Missing required fields");
      }
      const mongooseService = await MongooseService.get();
      const product = await mongooseService.productService.deleteProduct(
        req.params.id
      );
      if (!product) {
        res.status(404);
        throw new Error("Product not found");
      }
      res.status(204).send();
      return;
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  buildRouter(): Router {
    const router = Router();
    router.post(
      "/",
      authenticateToken,
      validateRoleAdmin,
      this.createProduct.bind(this)
    );
    router.get("/:id", validateObjectId, this.getOneProduct.bind(this));
    router.get("/", this.getProducts.bind(this));
    router.get(
      "/:attribute/:value",
      validateAttributeAndValue,
      this.getProductByAttribute.bind(this)
    );
    router.put(
      "/:id",
      authenticateToken,
      validateRoleAdmin,
      validateObjectId,
      this.updateProduct.bind(this)
    );
    router.delete(
      "/:id",
      authenticateToken,
      validateRoleAdmin,
      validateObjectId,
      this.deleteProduct.bind(this)
    );
    return router;
  }
}
