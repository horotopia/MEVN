import mongoose from 'mongoose';
import logger from './logger';

const connectDB = () => {
  const mongo_uri: string | undefined = process.env.MONGO_URI;

  if (!mongo_uri) {
    logger.error(new Error('MongoDB URI is not defined'));
    process.exit(1);
  }

  mongoose.connect(mongo_uri)
    .then (() => logger.info('MongoDB connected'))
    .catch ((error) => logger.error(new Error(`MongoDB connection error: ${error}`)));

  mongoose.connection.on('error', (error) => logger.error(new Error(`MongoDB connection error: ${error}`)));
  mongoose.connection.on('disconnected', () => logger.error(new Error('MongoDB disconnected')));
};

export default connectDB;
