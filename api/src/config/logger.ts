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
  winston.format.printf(
    (info) => `${info.level}: ${info.message}, timestamp : ${info.timestamp}`
  )
);

// Define log transports
const transports = [
  new winston.transports.Console(),
  new winston.transports.DailyRotateFile({
    filename: "logs/api-combined-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxFiles: "14d",
  }),
  new winston.transports.DailyRotateFile({
    filename: "logs/api-error-%DATE%.log",
    level: "error",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxFiles: "14d",
  }),
  new winston.transports.DailyRotateFile({
    filename: "logs/api-info-%DATE%.log",
    level: "info",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxFiles: "14d",
  }),
];

// Create the logger instance
const logger = winston.createLogger({
  level: level,
  levels,
  format,
  transports,
});

export default logger;
