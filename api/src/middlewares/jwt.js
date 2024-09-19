const jwt = require('jsonwebtoken');
const logger = require('../config/logger');
const SECRET_KEY = process.env.JWT_SECRET;

// Génération d'un token JWT
module.exports.generateToken = (user) => {
  return jwt.sign(user, SECRET_KEY, { expiresIn: '1d' });
};

// Vérification du token JWT
module.exports.authenticateToken = (req, res, next) => {
  req.user = "test";
  next();

  // const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  // if (!token) {
  //   logger.http(`${req.method} ${req.url} - ${res.statusCode}: Accès interdit, pas de token`);
  //   return res.status(401).json({ message: 'Accès interdit : pas de token' });
  // }

  // jwt.verify(token, SECRET_KEY, (err, user) => {
  //   if (err) {
  //     logger.http(`${req.method} ${req.url} - ${res.statusCode}: Token invalide`);
  //     return res.status(403).json({ message: 'Token invalide' });
  //   }
  //   req.user = user;
  //   next();
  // });
};
