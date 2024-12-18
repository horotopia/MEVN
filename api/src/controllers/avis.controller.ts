import { NextFunction, Request, Response, Router } from "express";
import { authenticateToken } from "../middlewares/jwt";
import { validateObjectId } from "../middlewares/validate";
import { MongooseService } from "../services/mongoose/mongoose.service";

export class AvisController {
  // TODO:
  // créer un avis
  /**
   * @swagger
   * /api/avis/:
   *   post:
   *     summary: Create a new avis
   *     tags: [Avis]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Avis'
   *           example:
   *             userId: "60f3b3b3b3b3b3b3b3b3b3"
   *             productId: "60f3b3b3b3b3b3b3b3b3b3"
   *             rating: 5
   *             comment: "Super produit"
   *     responses:
   *       201:
   *         description: Avis created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Avis'
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
  async createAvis(req: Request, res: Response, next: NextFunction) {
    try {
      if (
        !req.body ||
        !req.body.userId ||
        !req.body.productId ||
        !req.body.rating ||
        !req.body.comment
      ) {
        res.status(400);
        throw new Error("Bad request");
      }
      const mongooseService = await MongooseService.get();
      const avis = await mongooseService.avisService.createAvis({
        userId: req.body.userId,
        productId: req.body.productId,
        rating: req.body.rating,
        comment: req.body.comment,
      });
      res.status(201).json(avis);
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
  // obtenir tous les avis d'un user
  /**
   * @swagger
   * /api/avis/u/{userId}:
   *   get:
   *     summary: Get all avis by user
   *     tags: [Avis]
   *     parameters:
   *       - in: path
   *         name: userId
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the user to retrieve avis
   *     responses:
   *       200:
   *         description: Avis found
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Avis'
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Avis not found
   *       500:
   *         description: Internal server error
   */
  async getAvisByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params || !req.params.userId) {
        res.status(400);
        throw new Error("Bad request");
      }
      const mongooseService = await MongooseService.get();
      const avis = await mongooseService.avisService.findAllAvisByUserId(
        req.params.userId
      );
      res.status(200).json(avis);
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }
  // obtenir tous les avis d'un produit
  /**
   * @swagger
   * /api/avis/p/{productId}:
   *   get:
   *     summary: Get all avis by product
   *     tags: [Avis]
   *     parameters:
   *       - in: path
   *         name: productId
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the product to retrieve avis
   *     responses:
   *       200:
   *         description: Avis found
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Avis'
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Avis not found
   *       500:
   *         description: Internal server error
   */
  async getAvisByProductId(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params || !req.params.productId) {
        res.status(400);
        throw new Error("Bad request");
      }
      const mongooseService = await MongooseService.get();
      const avis = await mongooseService.avisService.findAllAvisByProductId(
        req.params.productId
      );
      res.status(200).json(avis);
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }
  // modifier un avis
  /**
   * @swagger
   * /api/avis/{id}:
   *   put:
   *     summary: Update an avis
   *     tags: [Avis]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the avis to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Avis'
   *           example:
   *             userId: "60f3b3b3b3b3b3b3b3b3b3"
   *             productId: "60f3b3b3b3b3b3b3b3b3b3"
   *             rating: 5
   *             comment: "Super produit"
   *     responses:
   *       200:
   *         description: Avis updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Avis'
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Avis not found
   *       500:
   *         description: Internal server error
   */
  async updateAvis(req: Request, res: Response, next: NextFunction) {
    try {
      if (
        !req.params ||
        !req.params.id ||
        !req.body ||
        !req.body.userId ||
        !req.body.productId ||
        !req.body.rating ||
        !req.body.comment
      ) {
        res.status(400);
        throw new Error("Bad request");
      }
      const mongooseService = await MongooseService.get();
      const avis = await mongooseService.avisService.updateAvis(req.params.id, {
        userId: req.body.userId,
        productId: req.body.productId,
        rating: req.body.rating,
        comment: req.body.comment,
      });
      if (!avis) {
        res.status(404);
        throw new Error("Avis not found");
      }
      res.status(200).json(avis);
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }
  // suppr un avis
  /**
   * @swagger
   * /api/avis/{id}:
   *   delete:
   *     summary: Delete an avis
   *     tags: [Avis]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the avis to delete
   *     responses:
   *       204:
   *         description: Avis deleted successfully
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Avis not found
   *       500:
   *         description: Internal server error
   */
  async deleteAvis(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params || !req.params.id) {
        res.status(400);
        throw new Error("Bad request");
      }
      const mongooseService = await MongooseService.get();
      const avis = await mongooseService.avisService.deleteAvis(req.params.id);
      if (!avis) {
        res.status(404);
        throw new Error("Avis not found");
      }
      res.status(204);
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }
  // anonymiser tous les avis du user (suppression de compte)
  /**
   * @swagger
   * /api/avis/u/{userId}:
   *   delete:
   *     summary: Delete all avis by user
   *     tags: [Avis]
   *     parameters:
   *       - in: path
   *         name: userId
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the user to delete avis
   *     responses:
   *       204:
   *         description: Avis deleted successfully
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Avis not found
   *       500:
   *         description: Internal server error
   */
  async deleteAvisByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params || !req.params.userId) {
        res.status(400);
        throw new Error("Bad request");
      }
      const mongooseService = await MongooseService.get();
      const avis = await mongooseService.avisService.anonymise(
        req.params.userId
      );
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  buildRouter(): Router {
    const router = Router();
    router.post("/", authenticateToken, this.createAvis);
    router.get("/u/:userId", authenticateToken, this.getAvisByUserId);
    router.get("/p/:productId", authenticateToken, this.getAvisByProductId);
    router.put("/:id", authenticateToken, validateObjectId, this.updateAvis);
    router.delete("/:id", authenticateToken, validateObjectId, this.deleteAvis);
    router.delete("/u/:userId", authenticateToken, this.deleteAvisByUserId);
    return router;
  }
}
