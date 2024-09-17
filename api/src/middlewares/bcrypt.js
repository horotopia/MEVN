const bcrypt = require('bcrypt');
const logger = require('../config/logger');

// Hachage du mot de passe avant l'enregistrement
module.exports.hashPassword = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword; // Remplacement du mot de passe par son hash
    next();
  } catch (error) {
    logger.error(`Error hashing password: ${error}`);
    res.status(500).json({ error: 'Erreur lors du hachage du mot de passe' });
  }
};
