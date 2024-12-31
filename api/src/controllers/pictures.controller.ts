import { NextFunction, Request, Response, Router } from "express";
import { authenticateToken } from "../middlewares/jwt";
import { validateObjectId } from "../middlewares/validate";
import { validateRoleAdmin } from "../middlewares/validator/validateRole";
import { MongooseService } from "../services/mongoose";

export class PicturesController {
/**
 * @swagger
 * /api/pictures/{userId}/{name}:
 *   post:
 *     summary: Créer une picture
 *     tags: [Pictures]
 *     description: Permet de créer une picture dans le système.
 *     operationId: uploadFile
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: L'identifiant unique de l'utilisateur.
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - name: name
 *         in: path
 *         description: Le nom de la picture.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Picture créée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: L'ID de la picture créée.
 *                 name:
 *                   type: string
 *                   description: Le nom de la picture.
 *       400:
 *         description: Requête invalide.
 *       401:
 *         description: Non autorisé.
 *       403:
 *         description: Accès refusé.
 *       409:
 *         description: La picture existe déjà.
 *       500:
 *         description: Erreur interne du serveur.
 */

  async createPicture(req: Request, res: Response, next: NextFunction) {
    try {
      if (
        !req.body ||
        !req.body.name ||
        !req.body.description ||
        ( !req.body.userId || !req.body.productId )
      ) {
        res.status(400);
        throw new Error("Bad Request");
      }
      const mongooseService = await MongooseService.get();
      const picture = await mongooseService.picturesService.createPicture({
        userId: req.body.userId || null,
        productId: req.body.productId || null,
        name: req.body.name,
        description: req.body.description,
      });
      res.status(201).json(picture);
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
   * /api/pictures/{id}:
   *   get:
   *     summary: Obtenir une picture
   *     tags: [Pictures]
   *     description: Obtenir une picture par son identifiant unique.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: L'identifiant unique de la picture
   *     responses:
   *       200:
   *         description: OK, la picture a été trouvée
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Pictures'
   *       400:
   *         description: Requête invalide, paramètres manquants ou mal formatés
   *       401:
   *         description: Non autorisé, l'utilisateur n'a pas les permissions nécessaires
   *       403:
   *         description: Accès refusé, l'utilisateur n'a pas la permission de consulter cette picture
   *       404:
   *         description: Non trouvé, la picture n'existe pas avec cet identifiant
   *       500:
   *         description: Erreur interne du serveur
   */
  async getPicture(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        res.status(400);
        throw new Error("Bad Request");
      }
      const mongooseService = await MongooseService.get();
      const picture = await mongooseService.picturesService.findPicturesById(
        req.params.id
      );
      if (!picture) {
        res.status(404);
        throw new Error("Not Found");
      }
      res.status(200).json(picture);
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  /**
   * @swagger
   * /api/pictures/u/{userId}:
   *   get:
   *     summary: Obtenir toutes les pictures d'un utilisateur
   *     tags: [Pictures]
   *     description: Obtenir toutes les pictures d'un utilisateur en utilisant son identifiant unique.
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         description: L'identifiant unique de l'utilisateur
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Les pictures ont été trouvées avec succès
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Pictures'
   *       400:
   *         description: Paramètres manquants ou mal formatés
   *       401:
   *         description: Non autorisé
   *       403:
   *         description: Accès refusé
   *       500:
   *         description: Erreur interne du serveur
   */
  async getAllPicturesByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.params || !req.params.userId) {
        res.status(400);
        throw new Error("Bad Request");
      }
      const mongooseService = await MongooseService.get();
      const pictures =
        await mongooseService.picturesService.findAllPicturesByUserId(
          req.params.userId
        );
      res.status(200).json(pictures);
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  /**
   * @swagger
   * /api/pictures/{id}:
   *   put:
   *     summary: Mettre à jour une picture
   *     tags: [Pictures]
   *     description: Mettre à jour les informations d'une picture dans le système.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: L'identifiant unique de la picture à mettre à jour
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Pictures'
   *     responses:
   *       200:
   *         description: Mis à jour avec succès, la picture a été modifiée
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Pictures'
   *       400:
   *         description: Requête invalide, paramètres mal formatés ou manquants
   *       401:
   *         description: Non autorisé, l'utilisateur n'a pas les permissions nécessaires
   *       403:
   *         description: Accès refusé, l'utilisateur n'a pas la permission de modifier cette picture
   *       404:
   *         description: La picture spécifiée n'existe pas avec cet identifiant
   *       500:
   *         description: Erreur interne du serveur
   */
  async updatePicture(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id || !req.body) {
        res.status(400);
        throw new Error("Bad Request");
      }
      const mongooseService = await MongooseService.get();
      const picture = await mongooseService.picturesService.updatePictures(
        req.params.id,
        req.body
      );
      if (!picture) {
        res.status(404);
        throw new Error("Not Found");
      }
      res.status(200).json(picture);
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  /**
   * @swagger
   * /api/pictures/{id}:
   *   delete:
   *     summary: Supprimer une picture
   *     tags: [Pictures]
   *     description: Supprimer une picture du système.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: L'identifiant unique de la picture à supprimer
   *         schema:
   *           type: string
   *     responses:
   *       204:
   *         description: Supprimé avec succès, la picture a été supprimée
   *       400:
   *         description: Requête invalide, paramètres manquants ou mal formatés
   *       401:
   *         description: Non autorisé, l'utilisateur n'a pas les permissions nécessaires
   *       403:
   *         description: Accès refusé, l'utilisateur n'a pas la permission de supprimer cette picture
   *       404:
   *         description: Non trouvé, la picture n'existe pas avec cet identifiant
   *       500:
   *         description: Erreur interne du serveur
   */
  async deletePicture(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params || !req.params.id) {
        res.status(400);
        throw new Error("Bad Request");
      }
      const mongooseService = await MongooseService.get();
      const picture = await mongooseService.picturesService.deletePictures(
        req.params.id
      );
      if (!picture) {
        res.status(404);
        throw new Error("Not Found");
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
   * /api/pictures/u/{userId}:
   *   delete:
   *     summary: Supprimer toutes les pictures d'un utilisateur
   *     tags: [Pictures]
   *     description: Supprimer toutes les pictures d'un utilisateur en utilisant son identifiant unique.
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         description: L'identifiant unique de l'utilisateur
   *         schema:
   *           type: string
   *     responses:
   *       204:
   *         description: Supprimé avec succès, toutes les pictures de l'utilisateur ont été supprimées
   *       400:
   *         description: Paramètres manquants ou mal formatés
   *       401:
   *         description: Non autorisé
   *       403:
   *         description: Accès refusé
   *       500:
   *         description: Erreur interne du serveur
   */
  async deleteAllPicturesByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.params || !req.params.userId) {
        res.status(400);
        throw new Error("Bad Request");
      }
      const mongooseService = await MongooseService.get();
      await mongooseService.picturesService.deleteAllPicturesByUserId(
        req.params.userId
      );
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
   * /api/pictures/p/{productId}:
   *   get:
   *     summary: Obtenir toutes les pictures d'un produit
   *     tags: [Pictures]
   *     description: Obtenir toutes les pictures d'un produit en utilisant son identifiant unique.
   *     parameters:
   *       - in: path
   *         name: productId
   *         required: true
   *         description: L'identifiant unique du produit
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Les pictures ont été trouvées avec succès
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Pictures'
   *       400:
   *         description: Paramètres manquants ou mal formatés
   *       401:
   *         description: Non autorisé
   *       403:
   *         description: Accès refusé
   *       500:
   *         description: Erreur interne du serveur
   */
  async getAllPicturesByProductId(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params || !req.params.productId) {
        res.status(400);
        throw new Error("Bad Request");
      }
      const mongooseService = await MongooseService.get();
      const pictures = await mongooseService.picturesService.findAllPicturesByProductId(
        req.params.productId
      );
      res.status(200).json(pictures);
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  /**
   * @swagger
   * /api/pictures/p/{productId}:
   *   delete:
   *     summary: Supprimer toutes les pictures d'un produit
   *     tags: [Pictures]
   *     description: Supprimer toutes les pictures d'un produit en utilisant son identifiant unique.
   *     parameters:
   *       - in: path
   *         name: productId
   *         required: true
   *         description: L'identifiant unique du produit
   *         schema:
   *           type: string
   *     responses:
   *       204:
   *         description: Supprimé avec succès, toutes les pictures du produit ont été supprimées
   *       400:
   *         description: Paramètres manquants ou mal formatés
   *       401:
   *         description: Non autorisé
   *       403:
   *         description: Accès refusé
   *       500:
   *         description: Erreur interne du serveur
   */
  async deleteAllPicturesByProductId( req: Request, res: Response, next: NextFunction ) {
    try {
      if (!req.params || !req.params.productId) {
        res.status(400);
        throw new Error("Bad Request");
      }
      const mongooseService = await MongooseService.get();
      await mongooseService.picturesService.deleteAllPicturesByProductId(
        req.params.productId
      );
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
    router.post("/", authenticateToken, this.createPicture);
    router.get("/:id", authenticateToken, validateObjectId, this.getPicture);
    router.get(
      "/u/:userId",
      validateObjectId,
      this.getAllPicturesByUserId
    );
    router.put("/:id", authenticateToken, validateObjectId, this.updatePicture);
    router.delete(
      "/:id",
      authenticateToken,
      validateObjectId,
      this.deletePicture
    );
    router.delete(
      "/u/:userId",
      authenticateToken,
      validateRoleAdmin,
      validateObjectId,
      this.deleteAllPicturesByUserId
    );

    router.get("/p/:productId", validateObjectId, this.getAllPicturesByProductId);
    router.delete(
      "/p/:productId",
      authenticateToken,
      validateRoleAdmin,
      validateObjectId,
      this.deleteAllPicturesByProductId
    );

    return router;
  }
}
