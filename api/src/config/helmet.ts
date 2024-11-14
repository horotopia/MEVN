import helmet from 'helmet';
import { Application } from 'express';
import logger from './logger';

const configureHelmet = (app: Application) => {
  app.use(helmet());
  // Optionnel: configuration spécifique si besoin
  // app.use(
  //   helmet({
  //     contentSecurityPolicy: {
  //       directives: {
  //         defaultSrc: ["'self'", "localhost:3000"],
  //         scriptSrc: ["'self'", "trusted-cdn.com"],
  //       }
  //     }
  //   })
  // );
  logger.info('Helmet has been enabled');
}

export default configureHelmet;
