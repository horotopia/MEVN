import { Request, Response, Router } from "express";
import logger from "../config/logger";
import { authenticateToken } from "../middlewares/jwt";
import { validateObjectId } from "../middlewares/validate";
import { MongooseService } from "../services/mongoose/mongoose.service";

export class AdressController {

  // TODO:
  // créer une adresse
  // obtenir toutes les addresses du user ( dl données perso)
  // modif une adresse
  // suppr une adresse
  // suppr toutes les adresses du user (suppression de compte : anonymisation ou suppr ???)

  buildRoutes(): Router {
    const router = Router();
    // routes
    return router;
  }
}