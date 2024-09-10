const winston = require("winston");
const dotenv = require("dotenv");

require("winston-daily-rotate-file");

dotenv.config();

// Set the log level based on the environment
const level = process.env.NODE_ENV === "development" ? "debug" : "info";

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 5,
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

module.exports = logger;
