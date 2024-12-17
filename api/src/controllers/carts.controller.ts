import { Request, Response, Router } from "express";
import logger from "../config/logger";
import { authenticateToken } from "../middlewares/jwt";
import { validateObjectId } from "../middlewares/validate";
import { MongooseService } from "../services/mongoose/mongoose.service";

export class CartsController {
  // créer un panier
  /**
   * @swagger
   * /api/carts/:
   *   post:
   *     summary: Create a new cart
   *     tags:
   *       - Carts
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
  async create(req: Request, res: Response) {
    if (
      !req.body ||
      typeof req.body.userId !== "string" ||
      !Array.isArray(req.body.items)
    ) {
      res.status(400).end();
      return;
    }
    const mongooseService = await MongooseService.get();
    try {
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
        res.status(409).end();
        return;
      }
      logger.error(error);
      res.status(500).end();
    }
  }

  // obtenir un panier
  /**
   * @swagger
   * /api/carts/{id}:
   *   get:
   *     summary: Get cart by ID
   *     tags:
   *       - Carts
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
  async get(req: Request, res: Response) {
    if (!req.params.id) {
      res.status(400).end();
      return;
    }
    const mongooseService = await MongooseService.get();
    try {
      const cart = await mongooseService.cartsService.findCartById(
        req.params.id
      );
      if (!cart) {
        res.status(404).end();
        return;
      }
      res.status(200).json(cart);
    } catch (error) {
      logger.error(error);
      res.status(500).end();
    }
  }

  //TODO:
  // obtenir tous les panier du user (dl données perso)
  // modifier un panier
  // suppr un panier
  // suppr tous les paniers du user (suppression de compte)

  buildRoutes(): Router {
    const router = Router();
    router.post("/", authenticateToken, this.create.bind(this));
    router.get(
      "/:id",
      authenticateToken,
      validateObjectId,
      this.get.bind(this)
    );
    router.get(
      "/u/:id",
      authenticateToken,
      validateObjectId,
      this.get.bind(this)
    );
    router.put(
      "/:id",
      authenticateToken,
      validateObjectId,
      this.create.bind(this)
    );
    router.delete(
      "/:id",
      authenticateToken,
      validateObjectId,
      this.create.bind(this)
    );
    router.delete(
      "/u/:id",
      authenticateToken,
      validateObjectId,
      this.create.bind(this)
    );
    return router;
  }
}
