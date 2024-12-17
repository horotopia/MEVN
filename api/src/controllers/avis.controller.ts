import { Request, Response, Router } from "express";
import logger from "../config/logger";
import { authenticateToken } from "../middlewares/jwt";
import { validateObjectId } from "../middlewares/validate";
import { MongooseService } from "../services/mongoose/mongoose.service";

export class AvisController {

  // TODO:
  // créer un avis
  // obtenir tous les avis d'un user
  // obtenir tous les avis d'un produit
  // modifier un avis
  // suppr un avis
  // anonymiser tous les avis du user (suppression de compte)

  buildRoutes(): Router {
    const router = Router();
    // routes
    return router;
  }
}