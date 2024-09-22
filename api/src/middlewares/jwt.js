import jwt from 'jsonwebtoken';
import logger from '../config/logger.js';
const SECRET_KEY = process.env.JWT_SECRET;

// Génération d'un token JWT
const generateToken = (user) => {
  return jwt.sign(user, SECRET_KEY, { expiresIn: '1d' });
};

// Vérification du token JWT
const authenticateToken = (req, res, next) => {
  const jwtToken = req.cookies["jwtToken"];
  if (!jwtToken) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  jwt.verify(jwtToken, SECRET_KEY, (err, user) => {
    if (err) {
      logger.http(`${req.method} ${req.url} - ${res.statusCode}: Token invalide`);
      return res.status(403).json({ message: 'Token invalide' });
    }
    req.user = user;
    next();
  });
};

export {
  generateToken,
  authenticateToken
};
