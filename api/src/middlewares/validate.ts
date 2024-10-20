import { validationResult } from "express-validator";

const validate = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Vérifier que l'utilisateur n'a pas de token
const validateNoToken = (req: any, res: any, next: any) => {
  const jwtToken = req.cookies["jwtToken"];
  if (jwtToken) {
    return res
      .status(401)
      .json({ message: "Token already generated, authorization denied" });
  }
  next();
};

export { validate, validateNoToken };
