import mongoose from 'mongoose';
import logger from './logger.js';

const connectDB = async () => {
  const mongo_uri = process.env.MONGO_URI;

  await mongoose.connect(mongo_uri)
    .then (() => logger.info('MongoDB connected'))
    .catch ((error) => logger.error(new Error(`MongoDB connection error: ${error}`)));

  mongoose.connection
  mongoose.connection.on('error', (error) => logger.error(new Error(`MongoDB connection error: ${error}`)));
  mongoose.connection.on('disconnected', () => logger.error(new Error('MongoDB disconnected')));
};

export default connectDB;
