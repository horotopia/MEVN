const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const swaggerUi = require('swagger-ui-express');

const swaggerSpec = require('./config/swagger');
const { connectDB } = require('./config/database');
const logger = require('./config/logger');

const errorHandler = require('./middlewares/errorHandler');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

// DB Connection
connectDB();

// Middleware
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(csurf({ cookie: true }));

// Routes
app.use('/api/users', userRoutes);

// Swagger
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handling
app.use(errorHandler);

// Listen to the server
const hostname = process.env.API_HOST || "localhost";
const PORT = process.env.API_PORT || 5000;

app.listen(PORT, hostname, () => {
  logger.info(`Server is running on http://${hostname}:${PORT}/`);
});