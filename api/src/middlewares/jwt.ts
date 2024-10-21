import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import logger from '../config/logger';

const SECRET_KEY: string | undefined = process.env.SECRET_KEY;

// Génération d'un token JWT
const generateToken = (user: any) => {
  if (!SECRET_KEY) {
    logger.error('SECRET_KEY is not defined');
    return '';
  }
  return jwt.sign(user, SECRET_KEY, { expiresIn: '1d' });
};

// Vérification du token JWT
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const jwtToken = req.cookies["jwtToken"];
  if (!jwtToken) {
    res.status(401).json({ message: 'No token, authorization denied' });
  }
  if (!SECRET_KEY) {
    logger.error('SECRET_KEY is not defined');
    res.status(500).json({ message: 'SECRET KEY is not defined' });
    return;
  }
  jwt.verify(jwtToken, SECRET_KEY, (err: any, user: any) => {
    if (err) {
      logger.http(`${req.method} ${req.url} - ${res.statusCode}: Token invalide`);
      res.status(403).json({ message: 'Token invalide' });
    }
    // req.user = user;
    next();
  });
};

export {
  generateToken,
  authenticateToken
};
