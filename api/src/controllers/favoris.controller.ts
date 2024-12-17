import { Request, Response, Router } from "express";
import logger from "../config/logger";
import { authenticateToken } from "../middlewares/jwt";
import { validateObjectId } from "../middlewares/validate";
import { MongooseService } from "../services/mongoose/mongoose.service";

export class FavorisController {

  // TODO:
  // créer un favoris
  // obtenir un favoris
  // obtenir tous les favoris du user (dl données perso)
  // (pas de modif)
  // suppr un favoris
  // suppr tous les favoris du user (suppression de compte)

  buildRoutes(): Router {
    const router = Router();
    // routes
    return router;
  }
}