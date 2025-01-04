import e, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const validateCreateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("validateCreateUser:", req.body);
  // Validation de l'email
  body("email").isEmail().withMessage("E-mail valide obligatoire");
  // Validation du mot de passe
  body("password")
    .isLength({ min: 12 })
    .withMessage("Le mot de passe au moins contenir 12 caractères")
    .matches(/[a-z]/)
    .withMessage("Le mot de passe doit contenir au moins une lettre minuscule")
    .matches(/[A-Z]/)
    .withMessage("Le mot de passe doit contenir au moins une lettre majuscule")
    .matches(/\d/)
    .withMessage("Le mot de passe doit contenir au moins un chiffre")
    .matches(/[@$!%*?&]/)
    .withMessage(
      "Le mot de passe doit contenir au moins un caractère spécial (@, $, !, %, *, ?, & etc.)"
    );

  // Vérification des erreurs de validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    next(errors);
  }
  next();
};

export default validateCreateUser;
