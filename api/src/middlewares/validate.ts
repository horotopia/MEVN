import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Vérifier que l'utilisateur n'a pas de token
const validateNoToken = (req: Request, res: Response, next: NextFunction) => {
  const jwtToken = req.cookies["jwtToken"];
  if (jwtToken) {
    res
      .status(401)
      .json({ message: "Token already generated, authorization denied" });
  }
  next();
};

const validateObjectId = (req: Request, res: Response, next: Function) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(401).json({ message: 'Invalid ID format' });
  }
  next();
};

export { validate, validateNoToken, validateObjectId };
