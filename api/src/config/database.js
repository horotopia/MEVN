const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async () => {
  const host = process.env.MONGO_HOST;
  const port = process.env.MONGO_PORT;
  const db_name = process.env.MONGO_DB;
  const mongo_uri = `mongodb://${host}:${port}/${db_name}?retryWrites=true&w=majority`;
  await mongoose.connect(mongo_uri)
    .then (() => logger.info('MongoDB connected'))
    .catch ((error) => logger.error(new Error(`MongoDB connection error: ${error}`)));
    
  mongoose.connection
  mongoose.connection.on('error', (error) => logger.error(new Error(`MongoDB connection error: ${error}`)));
  mongoose.connection.on('disconnected', () => logger.error(new Error('MongoDB disconnected')));
};

module.exports = { connectDB };
