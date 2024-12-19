import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import mongoose from "mongoose";

// Vérifier que les données envoyées sont valides
const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    throw new Error("Invalid data");
  }
  next();
};

// Vérifier que l'utilisateur n'a pas de token
const validateNoToken = (req: Request, res: Response, next: NextFunction) => {
  const jwtToken = req.cookies["jwtToken"];
  if (jwtToken) {
    res.status(401);
    throw new Error("You are already logged in");
  }
  next();
};

const validateObjectId = (req: Request, res: Response, next: Function) => {
  const id = req.params.id || req.params.userId || req.params.productId;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(401);
    throw new Error("Invalid ID format");
  }
  next();
};

const validateAttributeAndValue = (
  req: Request,
  res: Response,
  next: Function
) => {
  const attribute = req.params.attribute;
  const value = req.params.value;
  if (!attribute || !value) {
    res.status(401);
    throw new Error("Missing attribute or value");
  }
  const enumAttributes = [
    "name",
    "description",
    "type",
    "evolutionLevel",
    "evolutionReference",
    "weight",
    "height",
    "age",
    "price",
    "category",
  ];
  if (attribute && !enumAttributes.includes(attribute)) {
    res.status(401);
    throw new Error("Invalid attribute");
  }
  if (
    attribute === "name" ||
    attribute === "description" ||
    attribute === "evolutionReference"
  ) {
    if (typeof value !== "string") {
      res.status(401);
      throw new Error("Invalid value");
    }
  }
  if (
    attribute === "evolutionLevel" ||
    attribute === "weight" ||
    attribute === "height" ||
    attribute === "age" ||
    attribute === "price" ||
    attribute === "stock"
  ) {
    if (isNaN(Number(value))) {
      res.status(401);
      throw new Error("Invalid value");
    }
  }
  if (attribute === "type") {
    const enumTypes = ["feu", "eau", "plante", "électricité"];
    if (!enumTypes.includes(value)) {
      res.status(401);
      throw new Error("Invalid value");
    }
  }
  if (attribute === "category") {
    const enumCategories = [
      "pokémon",
      "pokéball",
      "baie",
      "objets",
      "médicaments",
    ];
    if (!enumCategories.includes(value)) {
      res.status(401);
      throw new Error("Invalid value");
    }
  }

  next();
};

export {
  validate,
  validateAttributeAndValue,
  validateNoToken,
  validateObjectId,
};
