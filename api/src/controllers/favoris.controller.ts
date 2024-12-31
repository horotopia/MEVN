import { NextFunction, Request, Response, Router } from "express";
import { authenticateToken } from "../middlewares/jwt";
import { validateObjectId } from "../middlewares/validate";
import {
  validateRoleAdminOrUser,
  validateRoleUser,
} from "../middlewares/validator/validateRole";
import { MongooseService } from "../services/mongoose/mongoose.service";

export class FavorisController {
  /**
   * @swagger
   * /api/favoris:
   *   post:
   *     tags: [Favoris]
   *     summary: Créer un favori
   *     description: Créer un favori pour un utilisateur et un produit donnés.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Favoris'
   *           example:
   *             userId: 5f4f6d7e5e5c5b5a5a4a5a5a
   *             productId: 5f4f6d7e5e5c5b5a5a4a5a5a
   *     responses:
   *       201:
   *         description: Favori créé avec succès
   *       400:
   *         description: Requête invalide
   *       401:
   *         description: Non autorisé
   *       403:
   *         description: Accès refusé
   *       409:
   *         description: Favori déjà existant
   *       500:
   *         description: Erreur serveur interne
   */
  async createFavoris(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body || !req.body.userId || !req.body.productId) {
        res.status(400);
        throw new Error("Bad request");
      }
      const mongooseService = await MongooseService.get();
      const favoris = await mongooseService.favorisService.createFavoris({
        userId: req.body.userId,
        productId: req.body.productId,
      });
      res.status(201).json(favoris);
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
   * /api/favoris/{id}:
   *   get:
   *     tags: [Favoris]
   *     summary: Obtenir un favori
   *     description: Obtenir un favori spécifique en utilisant son identifiant.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: L'identifiant du favori à récupérer
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Favori trouvé avec succès
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               $ref: '#/components/schemas/Favoris'
   *       400:
   *         description: Requête invalide
   *       401:
   *         description: Non autorisé
   *       403:
   *         description: Accès refusé
   *       404:
   *         description: Favori non trouvé
   *       500:
   *         description: Erreur interne du serveur
   */
  async getFavorisById(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params || !req.params.id) {
        res.status(400);
        throw new Error("Bad request");
      }
      const mongooseService = await MongooseService.get();
      const favoris = await mongooseService.favorisService.findFavorisById(
        req.params.id
      );
      if (!favoris) {
        res.status(404);
        throw new Error("Favoris not found");
      }
      res.status(200).json(favoris);
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  /**
   * @swagger
   * /api/favoris/u/{userId}:
   *   get:
   *     tags: [Favoris]
   *     summary: Obtenir tous les favoris d'un utilisateur
   *     description: Récupérer la liste de tous les favoris d'un utilisateur spécifié par son identifiant.
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         description: L'identifiant de l'utilisateur dont les favoris doivent être récupérés
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Favoris trouvés avec succès
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Favoris'
   *       401:
   *         description: Non autorisé
   *       403:
   *         description: Accès refusé
   *       404:
   *         description: Aucun favori trouvé pour cet utilisateur
   *       500:
   *         description: Erreur interne du serveur
   */
  async getAllFavorisByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params || !req.params.userId) {
        res.status(400);
        throw new Error("Bad request");
      }
      const mongooseService = await MongooseService.get();
      const favoris =
        await mongooseService.favorisService.findAllFavorisByUserId(
          req.params.userId
        );
      if (!favoris) {
        res.status(404);
        throw new Error("Favoris not found");
      }
      res.status(200).json(favoris);
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  /**
   * @swagger
   * /api/favoris/{id}:
   *   delete:
   *     tags: [Favoris]
   *     summary: Supprimer un favori
   *     description: Supprimer un favori spécifique en utilisant son identifiant.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: L'identifiant du favori à supprimer
   *         schema:
   *           type: string
   *     responses:
   *       204:
   *         description: Favori supprimé avec succès
   *       400:
   *         description: Requête invalide
   *       401:
   *         description: Non autorisé
   *       403:
   *         description: Accès refusé
   *       404:
   *         description: Favori non trouvé
   *       500:
   *         description: Erreur interne du serveur
   */
  async deleteFavoris(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params || !req.params.id) {
        res.status(400);
        throw new Error("Bad request");
      }
      const mongooseService = await MongooseService.get();
      const favoris = await mongooseService.favorisService.deleteFavoris(
        req.params.id
      );
      if (!favoris) {
        res.status(404);
        throw new Error("Favoris not found");
      }
      res.status(204);
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  // suppr tous les favoris du user (suppression de compte)
  /**
   * @swagger
   * /api/favoris/u/{userId}:
   *   delete:
   *     tags: [Favoris]
   *     summary: Supprimer tous les favoris d'un utilisateur
   *     description: Supprimer tous les favoris d'un utilisateur spécifié par son identifiant.
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         description: L'identifiant de l'utilisateur dont les favoris doivent être supprimés
   *         schema:
   *           type: string
   *     responses:
   *       204:
   *         description: Favoris supprimés avec succès
   *       400:
   *         description: Requête invalide
   *       401:
   *         description: Non autorisé
   *       403:
   *         description: Accès refusé
   *       404:
   *         description: Aucun favori trouvé pour cet utilisateur
   *       500:
   *         description: Erreur interne du serveur
   */
  async deleteAllFavorisByUserId(
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
      await mongooseService.favorisService.deleteAllFavorisByUserId(
        req.params.userId
      );
      res.status(204);
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  buildRouter(): Router {
    const router = Router();
    router.post("/", authenticateToken, validateRoleUser, this.createFavoris);
    router.get(
      "/:id",
      authenticateToken,
      validateRoleUser,
      validateObjectId,
      this.getFavorisById
    );
    router.get(
      "/u/:userId",
      authenticateToken,
      validateRoleAdminOrUser,
      validateObjectId,
      this.getAllFavorisByUserId
    );
    router.delete(
      "/:id",
      authenticateToken,
      validateRoleUser,
      validateObjectId,
      this.deleteFavoris
    );
    router.delete(
      "/u/:userId",
      authenticateToken,
      validateRoleAdminOrUser,
      validateObjectId,
      this.deleteAllFavorisByUserId
    );
    return router;
  }
}
