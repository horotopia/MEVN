import { NextFunction, Request, Response, Router } from "express";
import { authenticateToken } from "../middlewares/jwt";
import { validateObjectId } from "../middlewares/validate";
import {
  validateRoleAdminOrUser,
  validateRoleUser,
  validateUserId,
} from "../middlewares/validator/validateRole";
import { MongooseService } from "../services/mongoose/mongoose.service";

export class CartsController {
  /**
   * @swagger
   * /api/carts/:
   *   post:
   *     summary: Create a new cart
   *     tags: [Carts]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - userId
   *               - items
   *             properties:
   *               userId:
   *                 type: string
   *                 description: L'identifiant de l'utilisateur
   *               items:
   *                 type: array
   *                 items:
   *                   type: object
   *                   properties:
   *                     productId:
   *                       type: string
   *                       description: L'identifiant du produit
   *                     quantity:
   *                       type: number
   *                       description: La quantité du produit
   *             example:
   *               userId: 60f3b3b3b3b3b3b3b3b3b3b3
   *               items:
   *                 - productId: 60f3b3b3b3b3b3b3b3b3b3b3
   *                   quantity: 1
   *     responses:
   *       201:
   *         description: Cart created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Carts'
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
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (
        !req.body ||
        typeof req.body.userId !== "string" ||
        !Array.isArray(req.body.items)
      ) {
        res.status(400);
        throw new Error("Bad request");
      }
      const mongooseService = await MongooseService.get();
      const cart = await mongooseService.cartsService.createCart({
        userId: req.body.userId,
        items: req.body.items,
      });
      res.status(201).json(cart);
    } catch (error) {
      if (
        error instanceof Error &&
        error.name === "MongoServerError" &&
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
   * /api/carts/{id}:
   *   get:
   *     summary: Get cart by ID
   *     tags: [Carts]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the cart to retrieve
   *     responses:
   *       200:
   *         description: Cart found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Carts'
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Cart not found
   *       500:
   *         description: Internal server error
   */
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params || !req.params.id) {
        res.status(400);
        throw new Error("Bad request");
      }
      const mongooseService = await MongooseService.get();
      const cart = await mongooseService.cartsService.findCartById(
        req.params.id
      );
      if (!cart) {
        res.status(404);
        throw new Error("Cart not found");
      }
      res.status(200).json(cart);
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  /**
   * @swagger
   * /api/carts/u/{userId}:
   *   get:
   *     summary: Get all carts by user ID
   *     tags: [Carts]
   *     parameters:
   *       - in: path
   *         name: userId
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the user to retrieve carts
   *     responses:
   *       200:
   *         description: Carts found
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Carts'
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Carts not found
   *       500:
   *         description: Internal server error
   */
  async getAllCartsByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params || !req.params.userId) {
        res.status(400);
        throw new Error("Bad request");
      }
      const mongooseService = await MongooseService.get();
      const carts = await mongooseService.cartsService.findCartsByUserId(
        req.params.userId
      );
      if (!carts) {
        res.status(404);
        throw new Error("Carts not found");
      }
      res.status(200).json(carts);
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  /**
   * @swagger
   * /api/carts/{id}:
   *   put:
   *     summary: Update a cart
   *     tags: [Carts]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the cart to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - userId
   *               - items
   *             properties:
   *               userId:
   *                 type: string
   *                 description: L'identifiant de l'utilisateur
   *               items:
   *                 type: array
   *                 description: Liste des produits du panier
   *                 items:
   *                   type: object
   *                   required:
   *                     - productId
   *                     - quantity
   *                   properties:
   *                     productId:
   *                       type: string
   *                       description: L'identifiant du produit
   *                     quantity:
   *                       type: number
   *                       description: La quantité du produit
   *             example:
   *               userId: "60f3b3b3b3b3b3b3b3b3b3b3"
   *               items:
   *                 - productId: "60f3b3b3b3b3b3b3b3b3b3b3"
   *                   quantity: 1
   *     responses:
   *       200:
   *         description: Cart updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Carts'
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Cart not found
   *       500:
   *         description: Internal server error
   */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      if (
        !req.params ||
        !req.params.id ||
        !req.body ||
        typeof req.body.userId !== "string" ||
        !Array.isArray(req.body.items)
      ) {
        res.status(400);
        throw new Error("Bad request");
      }
      const mongooseService = await MongooseService.get();
      const cart = await mongooseService.cartsService.updateCart(
        req.params.id,
        {
          userId: req.body.userId,
          items: req.body.items,
        }
      );
      if (!cart) {
        res.status(404);
        throw new Error("Cart not found");
      }
      res.status(200).json(cart);
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  /**
   * @swagger
   * /api/carts/{id}:
   *   delete:
   *     summary: Delete a cart
   *     tags: [Carts]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the cart to delete
   *     responses:
   *       204:
   *         description: Cart deleted successfully
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Cart not found
   *       500:
   *         description: Internal server error
   */

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params || !req.params.id) {
        res.status(400);
        throw new Error("Bad request");
      }
      const mongooseService = await MongooseService.get();
      const cart = await mongooseService.cartsService.deleteCart(req.params.id);
      if (!cart) {
        res.status(404);
        throw new Error("Cart not found");
      }
      res.status(204).send();
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  /**
   * @swagger
   * /api/carts/u/{id}:
   *   delete:
   *     summary: Delete all carts by user ID
   *     tags: [Carts]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the user to delete carts
   *     responses:
   *       204:
   *         description: Carts deleted successfully
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Carts not found
   *       500:
   *         description: Internal server error
   */
  async deleteAllCartsByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.params || !req.params.userId) {
        res.status(400);
        throw new Error("Bad request");
      }
      const mongooseService = await MongooseService.get();
      await mongooseService.cartsService.deleteCartsByUserId(req.params.userId);
      res.status(204).send();
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  buildRouter(): Router {
    const router = Router();
    router.post("/", authenticateToken, this.create.bind(this));
    router.get(
      "/:id",
      authenticateToken,
      validateRoleUser,
      validateObjectId,
      this.get.bind(this)
    );
    router.get(
      "/u/:userId",
      authenticateToken,
      validateRoleAdminOrUser,
      validateUserId,
      this.getAllCartsByUserId.bind(this)
    );
    router.put(
      "/:id",
      authenticateToken,
      validateRoleUser,
      validateObjectId,
      this.update.bind(this)
    );
    router.delete(
      "/:id",
      authenticateToken,
      validateRoleUser,
      validateObjectId,
      this.delete.bind(this) 
    );
    router.delete(
      "/u/:userId",
      authenticateToken,
      validateRoleAdminOrUser,
      validateUserId,
      this.deleteAllCartsByUserId.bind(this)
    );
    return router;
  }
}
