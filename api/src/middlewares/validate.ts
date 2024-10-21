import { Request, Response, NextFunction } from "express";
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

export { validate, validateNoToken };
