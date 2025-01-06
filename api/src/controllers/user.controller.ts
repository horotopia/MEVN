import { NextFunction, Request, Response, Router } from "express";
import { authenticateToken } from "../middlewares/jwt";
import { validateObjectId } from "../middlewares/validate";
import {
  validateRoleAdmin,
  validateRoleAdminOrUserId,
  validateUserId,
} from "../middlewares/validator/validateRole";
import { MongooseService } from "../services/mongoose/mongoose.service";

export class UserController {
  /**
   * @swagger
   * /api/users/{id}:
   *  get:
   *    summary: Get user by id
   *    tags: [Users]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        required: true
   *        description: ID of the user to get
   *    responses:
   *      200:
   *        description: List of users
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/User'
   *      401:
   *        description: Unauthorized
   *      403:
   *        description: Forbidden
   *      404:
   *        description: Not found
   *      500:
   *        description: Server error
   */
  async getOneUser(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        res.status(400);
        throw new Error("Missing id parameter");
      }
      const mongooseService = await MongooseService.get();
      const user = await mongooseService.userService.findUserById(
        req.params.id
      );
      if (!user) {
        res.status(404);
        throw new Error("User not found");
      }
      res.status(200).json(user);
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
   * /api/users:
   *  get:
   *    summary: Get all users
   *    tags: [Users]
   *    responses:
   *      200:
   *        description: List of users
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/User'
   *      401:
   *        description: Unauthorized
   *      403:
   *        description: Forbidden
   *      404:
   *        description: Not found
   *      500:
   *        description: Server error
   */
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const mongooseService = await MongooseService.get();
      const users = await mongooseService.userService.findAllUsers();
      if (!users) {
        res.status(404);
        throw new Error("Users not found");
      }
      res.status(200).json(users);
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
   * /api/users/{id}:
   *   FIXME:
   *   put:
   *     summary: Update user by ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID of the user to update
   *     requestBody:
   *       description: Update an existent user
   *       content:
   *         application/json:
   *           schema:
   *            FIXME:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 description: Nom de l'utilisateur
   *               email:
   *                 type: string
   *                 description: Email de l'utilisateur
   *               password:
   *                 type: string
   *                 description: Mot de passe de l'utilisateur
   *             example:
   *               name: John Doe
   *               email: johndoe@example.com
   *               password: myPassword123
   *     responses:
   *       200:
   *         description: User successfully updated
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       400:
   *         description: Bad request - Invalid data or parameters
   *       401:
   *         description: Unauthorized - Authentication failed
   *       403:
   *         description: Forbidden - You don't have access to perform this action
   *       404:
   *         description: Not found - User ID not found
   *       500:
   *         description: Internal server error - Something went wrong
   */
  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id || !req.body) {
        res.status(400);
        throw new Error("Missing id parameter or body");
      }
      const mongooseService = await MongooseService.get();
      const user = await mongooseService.userService.updateUser(
        req.params.id,
        req.body
      );
      if (!user) {
        res.status(404);
        throw new Error("User not found");
      }
      res.status(200).json(user);
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
   * /api/users/{id}:
   *  delete:
   *    summary: Delete user by id
   *    tags: [Users]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        required: true
   *        description: ID of the user to get
   *    responses:
   *      200:
   *        description: List of users
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                $ref: '#/components/schemas/User'
   *      400:
   *        description: Bad request
   *      401:
   *        description: Unauthorized
   *      403:
   *        description: Forbidden
   *      404:
   *        description: Not found
   *      500:
   *        description: Server error
   */
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id) {
        res.status(400);
        throw new Error("Missing id parameter");
      }
      const mongooseService = await MongooseService.get();
      const user = await mongooseService.userService.deleteUser(req.params.id);
      if (!user) {
        res.status(404);
        throw new Error("User not found");
      }
      res.status(200).json(user);
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
   * /api/users/countUsersByMonth:
   *   get:
   *     summary: Compter le nombre d'utilisateurs par mois
   *     tags: [Users]
   *     description: Cette route retourne le nombre d'utilisateurs enregistrés pour le mois en cours, le mois précédent, et le taux de croissance d'enregistrement des utilisateurs.
   *     responses:
   *       200:
   *         description: Commandes trouvées avec succès.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 currentMonthUser:
   *                   type: integer
   *                   description: Nombre d'utilisateurs enregistrés pour le mois en cours.
   *                   example: 250
   *                 lastMonthUser:
   *                   type: integer
   *                   description:  Nombre d'utilisateurs enregistrés pour le mois précédent.
   *                   example: 200
   *                 growthRateUser:
   *                   type: number
   *                   format: float
   *                   description: Taux de croissance des utilisateurs enregistrés entre le mois précédent et le mois en cours (en pourcentage).
   *                   example: 25.0
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
  // countUsersByMonth
  async countUsersByMonth(req: Request, res: Response, next: NextFunction) {
    console.log("countUsersByMonth");
    try {
      const mongooseService = await MongooseService.get();
      const count = await mongooseService.userService.countUsersByMonth();
      res.status(200).json(count);
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  buildRouter(): Router {
    const router = Router();
    router.get("/countUsersByMonth", validateObjectId, this.countUsersByMonth.bind(this));
    router.get(
      "/:id",
      authenticateToken,
      validateUserId,
      this.getOneUser.bind(this)
    );
    router.get(
      "/",
      authenticateToken,
      validateRoleAdmin,
      this.getUsers.bind(this)
    );
    router.put(
      "/:id",
      authenticateToken,
      validateRoleAdminOrUserId,
      validateObjectId,
      this.updateUser.bind(this)
    );
    router.delete(
      "/:id",
      authenticateToken,
      validateRoleAdminOrUserId,
      validateObjectId,
      this.deleteUser.bind(this)
    );
    router.get("/countUsersByMonth",authenticateToken, validateRoleAdmin, this.countUsersByMonth.bind(this));
    return router;
  }
}
