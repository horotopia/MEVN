import { NextFunction, Request, Response, Router } from "express";
import { authenticateToken } from "../middlewares/jwt";
import { validateObjectId } from "../middlewares/validate";
import {
  validateRoleAdmin,
  validateRoleAdminOrUser,
  validateRoleAdminOrUserId,
  validateRoleUser,
  validateUserId,
} from "../middlewares/validator/validateRole";
import { MongooseService } from "../services/mongoose";

export class OrdersController {
  // TODO:
  // créer un order
  /**
   * @swagger
   * /api/orders/:
   *   post:
   *     summary: Créer une commande
   *     tags: [Orders]
   *     description: Créer une nouvelle commande dans le système.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Orders'
   *     responses:
   *       200:
   *         description: Commande créée avec succès.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Orders'
   *       400:
   *         description: Requête invalide.
   *       401:
   *         description: Non autorisé.
   *       403:
   *         description: Accès refusé.
   *       409:
   *         description: Une commande avec les mêmes informations existe déjà.
   *       500:
   *         description: Erreur interne du serveur.
   */
  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      if (
        !req.body ||
        !req.body.userId ||
        !req.body.items ||
        !req.body.totalAmount
      ) {
        res.status(400);
        throw new Error("Missing order data");
      }
      const mongooseService = await MongooseService.get();
      const order = await mongooseService.ordersService.createOrder({
        userId: req.body.userId,
        items: req.body.items,
        totalAmount: req.body.totalAmount,
        status: "pending",
      });
      res.status(201).json(order);
    } catch (error) {
      if (error instanceof Error && error.message === "Invalid total amount") {
        res.status(400);
      }
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

  // obtenir un order
  /**
   * @swagger
   * /api/orders/{id}:
   *   get:
   *     summary: Obtenir une commande
   *     tags: [Orders]
   *     description: Récupérer une commande spécifique à l'aide de son identifiant unique.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Identifiant unique de la commande.
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Commande trouvée avec succès.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Orders'
   *       400:
   *         description: Requête invalide.
   *       401:
   *         description: Non autorisé.
   *       403:
   *         description: Accès refusé.
   *       404:
   *         description: Commande non trouvée.
   *       500:
   *         description: Erreur interne du serveur.
   */
  async getOrder(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params || !req.params.id) {
        res.status(400);
        throw new Error("Missing order ID");
      }
      const mongooseService = await MongooseService.get();
      const order = await mongooseService.ordersService.findOrdersById(
        req.params.id
      );
      if (!order) {
        res.status(404);
        throw new Error("Order not found");
      }
      res.status(200).json(order);
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  // obtenir tous les orders du user (dl données perso)
  /**
   * @swagger
   * /api/orders/u/{userId}:
   *   get:
   *     summary: Obtenir toutes les commandes d'un utilisateur
   *     tags: [Orders]
   *     description: Récupérer toutes les commandes associées à un utilisateur spécifique à l'aide de son identifiant unique.
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         description: Identifiant unique de l'utilisateur.
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Commandes trouvées avec succès.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Orders'
   *       400:
   *         description: Requête invalide.
   *       401:
   *         description: Non autorisé.
   *       403:
   *         description: Accès refusé.
   *       404:
   *         description: Commandes non trouvées.
   *       500:
   *         description: Erreur interne du serveur.
   */
  async getOrdersByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params || !req.params.userId) {
        res.status(400);
        throw new Error("Missing user ID");
      }
      const mongooseService = await MongooseService.get();
      const orders = await mongooseService.ordersService.findAllOrdersByUserId(
        req.params.userId
      );
      res.status(200).json(orders);
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  // obtenir tous les orders par status (partie admin)
  /**
   * @swagger
   * /api/orders/s/{status}:
   *   get:
   *     summary: Obtenir toutes les commandes par statut
   *     tags: [Orders]
   *     description: Récupérer toutes les commandes associées à un statut spécifique.
   *     parameters:
   *       - in: path
   *         name: status
   *         required: true
   *         description: Statut de la commande.
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Commandes trouvées avec succès.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Orders'
   *       400:
   *         description: Requête invalide.
   *       401:
   *         description: Non autorisé.
   *       403:
   *         description: Accès refusé.
   *       404:
   *         description: Commandes non trouvées.
   *       500:
   *         description: Erreur interne du serveur.
   */
  async getOrdersByStatus(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params || !req.params.status) {
        res.status(400);
        throw new Error("Missing status");
      }
      const mongooseService = await MongooseService.get();
      const orders = await mongooseService.ordersService.findAllOrdersByStatus(
        req.params.status
      );
      res.status(200).json(orders);
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  // obtenir tous les orders (partie admin)
  /**
   * @swagger
   * /api/orders/:
   *   get:
   *     summary: Obtenir toutes les commandes
   *     tags: [Orders]
   *     description: Récupérer toutes les commandes du système.
   *     responses:
   *       200:
   *         description: Commandes trouvées avec succès.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Orders'
   *       400:
   *         description: Requête invalide.
   *       401:
   *         description: Non autorisé.
   *       403:
   *         description: Accès refusé.
   *       404:
   *         description: Commandes non trouvées.
   *       500:
   *         description: Erreur interne du serveur.
   */
  async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const mongooseService = await MongooseService.get();
      const orders = await mongooseService.ordersService.findAllOrders();
      res.status(200).json(orders);
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  // modifier un order (partie admin)
  /**
   * @swagger
   * /api/orders/{id}:
   *   put:
   *     summary: Modifier une commande
   *     tags: [Orders]
   *     description: Modifier une commande spécifique à l'aide de son identifiant unique.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Identifiant unique de la commande.
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Orders'
   *     responses:
   *       204:
   *         description: Commande modifiée avec succès.
   *       400:
   *         description: Requête invalide.
   *       401:
   *         description: Non autorisé.
   *       403:
   *         description: Accès refusé.
   *       404:
   *         description: Commande non trouvée.
   *       500:
   *         description: Erreur interne du serveur.
   */
  async updateOrder(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params || !req.params.id) {
        throw new Error("Missing order ID");
      }
      if (!req.body) {
        throw new Error("Missing order data");
      }
      const mongooseService = await MongooseService.get();
      const order = await mongooseService.ordersService.findOrdersById(
        req.params.id
      );
      if (!order) {
        res.status(404);
        throw new Error("Order not found");
      }
      await mongooseService.ordersService.updateOrder(req.params.id, req.body);
      res.status(204).end();
    } catch (error) {
      if (
        (error instanceof Error && error.message === "Missing order ID") ||
        (error instanceof Error && error.message === "Missing order data")
      ) {
        res.status(400);
      }
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  // supprimer un order (partie admin)
  /**
   * @swagger
   * /api/orders/{id}:
   *   delete:
   *     summary: Supprimer une commande
   *     tags: [Orders]
   *     description: Supprimer une commande spécifique à l'aide de son identifiant unique.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Identifiant unique de la commande.
   *         schema:
   *           type: string
   *     responses:
   *       204:
   *         description: Commande supprimée avec succès.
   *       400:
   *         description: Requête invalide.
   *       401:
   *         description: Non autorisé.
   *       403:
   *         description: Accès refusé.
   *       404:
   *         description: Commande non trouvée.
   *       500:
   *         description: Erreur interne du serveur.
   */
  async deleteOrder(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params || !req.params.id) {
        res.status(400);
        throw new Error("Missing order ID");
      }
      const mongooseService = await MongooseService.get();
      await mongooseService.ordersService.deleteOrder(req.params.id);
      res.status(204);
    } catch (error) {
      if (error instanceof Error && error.message === "Order not found") {
        res.status(404);
      }
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  // anonymiser tous les orders du user (suppression du compte)
  /**
   * @swagger
   * /api/orders/u/{userId}:
   *   delete:
   *     summary: Anonymiser les commandes d'un utilisateur
   *     tags: [Orders]
   *     description: Anonymiser toutes les commandes associées à un utilisateur spécifique à l'aide de son identifiant unique.
   *     parameters:
   *       - in: path
   *         name: userId
   *         required: true
   *         description: Identifiant unique de l'utilisateur.
   *         schema:
   *           type: string
   *     responses:
   *       204:
   *         description: Commandes anonymisées avec succès.
   *       400:
   *         description: Requête invalide.
   *       401:
   *         description: Non autorisé.
   *       403:
   *         description: Accès refusé.
   *       404:
   *         description: Commandes non trouvées.
   *       500:
   *         description: Erreur interne du serveur.
   */
  async deleteOrdersByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params || !req.params.userId) {
        res.status(400);
        throw new Error("Missing user ID");
      }
      const mongooseService = await MongooseService.get();
      await mongooseService.ordersService.findAllOrdersByUserId(
        req.params.userId
      );
      await mongooseService.ordersService.anonymise(req.params.userId);
      res.status(204).end();
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  buildRouter(): Router {
    const router = Router();
    router.post("/", authenticateToken, validateRoleUser, this.createOrder);
    router.get(
      "/:id",
      authenticateToken,
      validateRoleUser ,
      validateObjectId,
      this.getOrder
    );
    router.get(
      "/u/:userId",
      authenticateToken,
      validateRoleAdminOrUserId,
      validateObjectId,
      this.getOrdersByUserId
    );
    router.get(
      "/s/:status",
      authenticateToken,
      validateRoleAdmin,
      this.getOrdersByStatus
    );
    router.get("/", authenticateToken, validateRoleAdmin, this.getOrders);
    router.put(
      "/:id",
      authenticateToken,
      validateRoleAdmin,
      validateObjectId,
      this.updateOrder
    );
    router.delete(
      "/:id",
      authenticateToken,
      validateRoleAdmin,
      validateObjectId,
      this.deleteOrder
    );
    router.delete(
      "/u/:userId",
      authenticateToken,
      validateRoleAdminOrUser,
      validateObjectId,
      this.deleteOrdersByUserId
    );
    return router;
  }
}
