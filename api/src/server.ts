import compression from "compression";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

// Configurations
import configureCORS from "./config/cors";
import connectDB from "./config/database";
import configureHelmet from "./config/helmet";
import logger from "./config/logger";
import swaggerSpec from "./config/swagger";

// Middlewares
import errorHandler from "./middlewares/errorHandler";

// Routes
import {
  AddressController,
  AuthController,
  AvisController,
  CartsController,
  FavorisController,
  OrdersController,
  PicturesController,
  ProductController,
  UserController,
} from "./controllers";

import mailRoutes from './routes/mail.routes';

config();
const app: Express = express();

// config
configureCORS(app);
configureHelmet(app);

app.use(
  compression({
    // Compress all HTTP responses
    filter: (req: Request, res: Response) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
    threshold: 0,
  })
);

// Security
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// traque des requêtes
app.use((req: Request, res: Response, next: NextFunction) => {
  if (process.env.MODE_ENV === "development") {
    logger.http(`${req.method} ${req.url}`, {
      method: req.method,
      url: req.url,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });
  }
  next();
});

// Swagger
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the API");
});

app.get(/^\/uploads\/products\/(.*)/, function (req, res) {
  res.set('Cross-Origin-Resource-Policy', 'cross-origin');
  res.sendFile(__dirname + '/uploads/products/' + req.params[0]);
});

// uploads users folder
app.get(/^\/uploads\/users\/(.*)/, function (req, res) {
  res.set('Cross-Origin-Resource-Policy', 'cross-origin');
  res.sendFile(__dirname + '/uploads/users/' + req.params[0]);
});

const addressController = new AddressController();
app.use("/api/address", addressController.buildRouter());
const authController = new AuthController();
app.use("/api/auth", authController.buildRouter());
const avisController = new AvisController();
app.use("/api/avis", avisController.buildRouter());
const cartsController = new CartsController();
app.use("/api/carts", cartsController.buildRouter());
const favorisController = new FavorisController();
app.use("/api/favoris", favorisController.buildRouter());
const ordersController = new OrdersController();
app.use("/api/orders", ordersController.buildRouter());
const picturesController = new PicturesController();
app.use("/api/pictures", picturesController.buildRouter());
const productController = new ProductController();
app.use("/api/product", productController.buildRouter());
const userController = new UserController();
app.use("/api/users", userController.buildRouter());

// Middleware d'erreurs global
app.use(errorHandler(logger));

// Ajouter avec les autres routes
app.use('/api/mail', mailRoutes);

// Listen to the server
const port: string | number = process.env.API_PORT || 5000;

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}/`);
  logger.info(`Swagger UI available at http://localhost:${port}/doc`);

  // DB Connection
  connectDB();
});
