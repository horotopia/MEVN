const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
// Configurations
const swaggerSpec = require("./config/swagger");
const { connectDB } = require("./config/database");
const logger = require("./config/logger");
const configureCORS = require("./config/cors");
const configureHelmet = require("./config/helmet");
// Middlewares
const errorHandler = require("./middlewares/errorHandler");
// Routes
const authRoutes = require("./routes/authRoutes");
const usersRoutes = require("./routes/usersRoutes");

dotenv.config();

const app = express();

// DB Connection
connectDB();

// config
configureCORS(app);
configureHelmet(app);

// Security
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Swagger
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the API"); // test
});
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

// Error handling
app.use(errorHandler);

// Listen to the server
const port = process.env.API_PORT || 5000;

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}/`);
  logger.info(`Swagger UI available at http://localhost:${port}/doc`);
});
