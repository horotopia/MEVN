import cors from 'cors';
import { Application } from 'express';
import logger from './logger';

const configureCORS = (app: Application) => {
  const corsOptions = {
    origin: 'http://localhost:5000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    Credentials: true,
    optionsSuccessStatus: 200,
  };

  app.use(cors(corsOptions));

  logger.info('Cors has been enabled');
};

export default configureCORS;
