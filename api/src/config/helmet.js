const helmet = require('helmet');
const logger = require('./logger');

module.exports = (app) => {
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
