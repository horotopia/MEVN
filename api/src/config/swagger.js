const swaggerJsdoc = require("swagger-jsdoc");

const hostname = process.env.API_HOST || "localhost";
const port = process.env.API_PORT || 5000;

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: Le nom de l'utilisateur
 *         email:
 *           type: string
 *           description: L'email de l'utilisateur
 *         password:
 *           type: string
 *           description: Le mot de passe de l'utilisateur
 *         role:
 *           type: string
 *           enum: [ROLE_USER, ROLE_STORE_KEEPER, ROLE_ADMIN, ROLE_COMPTA]
 *           default: ROLE_USER
 *       example:
 *         name: John Doe
 *         email: john.doe@toto.com
 *         password: password
 *         role: ROLE_USER
 */

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce API",
      version: "0.1.0",
      description: "E-commerce API documentation",
    },
    servers: [
      {
        url: `http://${hostname}:${port}`,
        description: "Development server",
      },
    ],
  },
  apis: ["src/routes/*.js", "../models/*.js", `${__dirname}/swagger.js`],
});

module.exports = swaggerSpec;
