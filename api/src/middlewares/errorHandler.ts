import logger from '../config/logger';

const errorHandler = (err: any, req: any, res: any, next: any) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip
  });

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  res.json({
    message: err.message,
    ...(process.env.NODE_ENV === 'production' ? null : { stack: err.stack })
  });
};

export default errorHandler;
