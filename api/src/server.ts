import compression from "compression";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import bodyParser from 'body-parser';
import { Stripe } from 'stripe';
import cors from 'cors';

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
  UploadController,
  UserController,
} from "./controllers";

import mailRoutes from './routes/mail.routes';

const stripe = new Stripe('sk_test_51QbfWPAp1XlFPm6zLkvVNhO8pYoxpQhqwIJwCA0uaVb6CSTnFIZhBZIqw7vsMgVTfZmCjK58buTuBqXutEbVRAGf004LpVVZTa', { apiVersion: '2024-06-20' });

config();
const app: Express = express();

// config
configureCORS(app);
configureHelmet(app);
app.use(bodyParser.json());

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

// Endpoint pour créer un PaymentIntent
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency } = req.body; // Récupération des données du frontend
    
    if (!amount || !currency) {
      throw new Error('Le montant et la devise sont requis.');
    }

    // Création du PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Montant en centimes (5000 pour 50,00 €)
      currency, // Devise (par exemple, 'eur')
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret, // Envoyer le client_secret au frontend
    });
  } catch (error) {
    res.status(500).send({});
  }
});

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

const uploadController = new UploadController();
app.use("/api/upload", uploadController.buildRouter());

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
