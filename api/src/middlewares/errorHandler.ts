import { NextFunction, Request, Response } from "express";
import { Logger } from "winston";

const errorHandler = (logger: Logger) => {
  return (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode;
    if (statusCode === 500) {
      logger.error(`${statusCode}: ${req.method} ${req.url}`, {
        clientIP: req.ip,
        errorStack: err.stack,
        url: req.originalUrl,
        method: req.method,
        ip: req.ip,
      });
    }
    if ([400, 401, 403, 409].includes(statusCode)) {
      logger.warn(`${statusCode}: ${req.method} ${req.url}`, {
        clientIP: req.ip,
        errorMessage: err.message,
        url: req.originalUrl,
        method: req.method,
        ip: req.ip,
        resources: [req.body, req.params, req.query],
      });
    }
    if (statusCode === 404) {
      logger.info(`${statusCode}: ${req.method} ${req.url}`, {
        clientIP: req.ip,
        errorMessage: err.message,
        url: req.originalUrl,
        method: req.method,
        ip: req.ip,
      });
    }

    res.status(statusCode).json({
      message: err.message,
      ...(process.env.MODE_ENV === "production" ? null : { stack: err.stack }),
    });
  };
};

export default errorHandler;
