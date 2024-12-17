import { Request, Response, Router } from "express";
import logger from "../config/logger";
import { authenticateToken } from "../middlewares/jwt";
import { validateObjectId } from "../middlewares/validate";
import { MongooseService } from "../services/mongoose/mongoose.service";

export class PicturesController {

  // TODO:
  // créer une picture
  // obtenir toutes les pictures du user (pour choisir parmis celles uploadées)
  // obtenir la picture selectionnée du user
  // modifier la picture selectionnée du user
  // suppr une picture
  // suppr toutes les pictures du user (suppresion de compte)

  buildRoutes(): Router {
    const router = Router();
    // routes
    return router;
  }
}