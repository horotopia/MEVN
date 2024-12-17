import compression from "compression";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express, { Express, Request, Response } from "express";
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
import { AuthController } from "./controllers/auth.controller";
import { ProductController } from "./controllers/product.controller";
import { UserController } from "./controllers/user.controller";

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

// Error handling
app.use(errorHandler);

// Swagger
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the API");
});

const authController = new AuthController();
app.use("/api/auth", authController.buildRouter());
const userController = new UserController();
app.use("/api/users", userController.buildRouter());
const productController = new ProductController();
app.use("/api/product", productController.buildRouter());

// Listen to the server
const port: string | number = process.env.API_PORT || 5000;

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}/`);
  logger.info(`Swagger UI available at http://localhost:${port}/doc`);

  // DB Connection
  connectDB();
});
