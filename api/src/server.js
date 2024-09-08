const app = require('./app');
const { connectDB } = require('./config/database');

const hostname = 'localhost';
const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, hostname, () => {
  logger.info( new info(`Server is running on https://${hostname}:${PORT}/`));
});
