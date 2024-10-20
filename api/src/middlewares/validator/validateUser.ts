import { body, validationResult } from "express-validator";
import logger from "../../config/logger";

const validateUser = [
  // Validation de l'email
  body("email").isEmail().withMessage("E-mail valide obligatoire"),
  // Validation du mot de passe
  body("password")
    .isLength({ min: 12 }).withMessage("Le mot de passe au moins contenir 12 caractères")
    .matches(/[a-z]/).withMessage('Le mot de passe doit contenir au moins une lettre minuscule')
    .matches(/[A-Z]/).withMessage('Le mot de passe doit contenir au moins une lettre majuscule')
    .matches(/\d/).withMessage('Le mot de passe doit contenir au moins un chiffre')
    .matches(/[@$!%*?&]/).withMessage('Le mot de passe doit contenir au moins un caractère spécial (@, $, !, %, *, ?, & etc.)'),

  // Vérification des erreurs de validation
  (req: any, res: any, next: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.http(`${req.method} ${req.url} - ${res.statusCode}`);
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export default validateUser;
