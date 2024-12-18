import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import mongoose from "mongoose";

// Vérifier que les données envoyées sont valides
const validate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      throw new Error("Invalid data");
    }
    next();
  } catch (error) {
    if (!res.statusCode) {
      res.status(500);
    }
    next(error);
  }
};

// Vérifier que l'utilisateur n'a pas de token
const validateNoToken = (req: Request, res: Response, next: NextFunction) => {
  const jwtToken = req.cookies["jwtToken"];
  try {
    if (jwtToken) {
      res.status(401);
      throw new Error("You are already logged in");
    }
    next();
  } catch (error) {
    if (!res.statusCode) {
      res.status(500);
    }
    next(error);
  }
};

const validateObjectId = (req: Request, res: Response, next: Function) => {
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(401);
      throw new Error("Invalid ID format");
    }
    next();
  } catch (error) {
    if (!res.statusCode) {
      res.status(500);
    }
    next(error);
  }
};

export { validate, validateNoToken, validateObjectId };
