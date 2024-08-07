const { createLogger, addColors, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const dotenv = require('dotenv');

dotenv.config()

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 5,
}

const level = () => {
  const env = process.env.NODE_ENV ?? "development"
  const isDevelopment = env === "development"
  return isDevelopment ? "debug" : "warn"
}

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
}

addColors(colors)

const format = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  colorize({ all: true }),
  printf(
    (info) => `${info.level}: ${info.message}, timestamp : ${info.timestamp}`,
  ),
)

const transports = [
  new transports.Console(),
  new transports.File({
    filename: "logs/error.log",
    level: "error",
  }),
  new transports.File({ filename: `logs/all_${new Date().toLocaleDateString().split('/').join('')}.log` }),
]

const logger = createLogger({
  level: level(),
  levels,
  format,
  transports,
})

logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  },
};

module.exports = logger;