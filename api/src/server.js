import compression from "compression";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";

// Configurations
import swaggerSpec from "./config/swagger.js";
import connectDB from "./config/database.js";
import logger from "./config/logger.js";
import configureCORS from "./config/cors.js";
import configureHelmet from "./config/helmet.js";

// Middlewares
import errorHandler from "./middlewares/errorHandler.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

const app = express();

// config
configureCORS(app);
configureHelmet(app);

app.use(
  compression({
      // Compress all HTTP responses
      filter: (req, res) => {
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
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use("/api/upload", uploadRoutes);

// Listen to the server
const port = process.env.API_PORT || 5000;

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}/`);
  logger.info(`Swagger UI available at http://localhost:${port}/doc`);

  // DB Connection
  connectDB();
});
