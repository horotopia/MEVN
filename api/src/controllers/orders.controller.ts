import { Request, Response, Router } from "express";
import logger from "../config/logger";
import { authenticateToken } from "../middlewares/jwt";
import { validateObjectId } from "../middlewares/validate";
import { MongooseService } from "../services/mongoose/mongoose.service";

export class OrdersController {

  // TODO:
  // créer un order
  // obtenir un order
  // obtenir tous les orders du user (dl données perso)
  // obtenir tous les orders par status (partie admin)
  // modifier ou pas ?
  // suppr un pas ?
  // anonymiser tous les orders du user (suppression du compte)

  buildRoutes(): Router {
    const router = Router();
    // routes
    return router;
  }
}