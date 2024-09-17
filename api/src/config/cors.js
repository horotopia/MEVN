const cors = require('cors');
const logger = require('./logger');

module.exports = (app) =>{
  const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    Credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

logger.info('Cors has been enabled');

};