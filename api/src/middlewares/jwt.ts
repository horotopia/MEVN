import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import logger from "../config/logger";

config();

const SECRET_KEY: string | undefined = process.env.SECRET_KEY;

// Génération d'un token JWT
const generateToken = (user: any) => {
  if (!SECRET_KEY) {
    logger.error("SECRET_KEY is not defined");
    return "";
  }
  return jwt.sign({
    id: user._id,
    email: user.email,
    name: user.name
  }, SECRET_KEY, { expiresIn: "1d" });
};

// Vérification du token JWT
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const jwtToken = authHeader && authHeader.split(" ")[1];

  try {
    if (!jwtToken) {
      res.status(401);
      throw new Error("Token manquant");
    }
    if (!SECRET_KEY) {
      res.status(500);
      throw new Error("SECRET_KEY is not defined");
    }
    jwt.verify(jwtToken, SECRET_KEY, (err: any, user: any) => {
      if (err) {
        res.status(403);
        throw new Error("Token invalide");
      }
      next();
    });
  } catch (error) {
    if (!res.statusCode) {
      res.status(500);
    }
    next(error);
  }
};

export { authenticateToken, generateToken };
