import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import logger from "../../config/logger";

const validateRoleAdmin: Array<
  (req: Request, res: Response, next: NextFunction) => void
> = [
  body("role").isIn(["ROLE_ADMIN"]).withMessage("forbidden"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.http(`${req.method} ${req.url} - ${res.statusCode}`);
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  },
];

export default validateRoleAdmin;
