import { config } from "dotenv";
import winston from "winston";

import "winston-daily-rotate-file";

config();

// Set the log level based on the environment
const level = process.env.MODE_ENV === "development" ? "debug" : "info";

interface Logger {
  error: (message: string) => void;
  warn: (message: string) => void;
  info: (message: string) => void;
  http: (message: string) => void;
  debug: (message: string) => void;
}

// Define log levels
const levels = {
  error: 0, // logger.error(`Erreur capturée : ${e.message}`);
  warn: 1, // logger.warn("La mémoire disponible est faible, surveillez cela.");
  info: 2, // logger.info("L'application a démarré correctement sur le port 3000.");
  http: 3, // logger.http(`${req.method} ${req.url} - ${res.statusCode}`);
  debug: 5, // logger.debug("Détails internes de la requête : ", { reqBody: req.body, reqParams: req.params });
};

// Define log colors
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};
winston.addColors(colors);

// Define log format
const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.errors({ stack: true }),
  winston.format.printf((info) => {
    const stack = info.stack ? `\nStack trace: ${info.stack}` : "";
    return `${info.level}: ${info.message}, timestamp : ${info.timestamp}${stack}`;
  })
);

// Function to create the transports
const createDailyRotateFile = (filename: string, level?: string) =>
  new winston.transports.DailyRotateFile({
    filename: `logs/${filename}-%DATE%.log`,
    level,
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxFiles: "14d",
  });

// Define the transports
const transports = [
  new winston.transports.Console(),
  createDailyRotateFile("api-combined"),
  createDailyRotateFile("api-error", "error"),
  createDailyRotateFile("api-info", "info"),
  createDailyRotateFile("api-http", "http"),
];

// Create the logger instance
const logger = winston.createLogger({
  level,
  levels,
  format,
  transports,
});

logger.exceptions.handle(
  new winston.transports.Console(),
  createDailyRotateFile("api-exceptions")
);

process.on("unhandledRejection", (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise} reason: ${reason}`);
});

export default logger;
