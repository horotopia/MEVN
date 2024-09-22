import helmet from 'helmet';
import logger from './logger.js';

const configureHelmet = (app) => {
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
