import { config } from "dotenv";
import swaggerJsdoc, { Options } from "swagger-jsdoc";

config();
interface SwaggerInfo {
  title: string;
  version: string;
  description: string;
}

interface SwaggerServer {
  url: string;
  description: string;
}

interface SwaggerDefinition {
  openapi: string;
  info: SwaggerInfo;
  servers: SwaggerServer[];
}

interface SwaggerOptions extends Options {
  definition: SwaggerDefinition;
  apis: string[];
}

const hostname: string = process.env.API_HOST || "localhost";
const port: string | number = process.env.API_PORT || 5000;

const swaggerOptions: SwaggerOptions = {
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
  apis: ["src/controllers/*.ts", "src/services/**/*.ts", "./swagger.js"],
};

export default swaggerJsdoc(swaggerOptions);
