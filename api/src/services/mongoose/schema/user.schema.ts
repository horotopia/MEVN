import { Schema } from "mongoose";
import { User } from "../../../models";

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Le nom du produit
 *           required: true
 *           trim: true
 *           maxLength: 100
 *         description:
 *           type: string
 *           description: La description du produit
 *           required: true
 *           maxLength: 500
 *         type:
 *           type: string
 *           description: Le type du produit
 *           required: true
 *           enum: [feu, eau, plante, électricité]
 *           default: feu
 *         evolutionLevel:
 *           type: number
 *           description: Le niveau d'évolution du produit
 *           required: true
 *           min: 1
 *           max: 3
 *         evolutionReference:
 *           type: string
 *           description: La référence de l'évolution du produit
 *           required: true
 *           trim: true
 *           maxLength: 100
 *         weight:
 *           type: number
 *           description: Le poids du produit en grammes
 *           required: true
 *           min: 0
 *         height:
 *           type: number
 *           description: La taille du produit en centimètres
 *           required: true
 *           min: 0
 *         age:
 *           type: number
 *           description: L'âge du produit
 *           required: true
 *           min: 0
 *         price:
 *           type: number
 *           description: Le prix du produit en €
 *           required: true
 *           min: 0
 *         category:
 *           type: string
 *           description: La catégorie du produit
 *           required: true
 *           enum: [pokémon, pokéball, baie, objets, médicaments]
 *           default: pokémon
 *         stock:
 *           type: number
 *           description: Le stock du produit
 *           default: 0
 *       required:
 *         - name
 *         - description
 *         - type
 *         - evolutionLevel
 *         - evolutionReference
 *         - weight
 *         - height
 *         - age
 *         - price
 *         - category
 *         - stock
 *       example:
 *         name: Pikachu
 *         description: Pokémon électrique
 *         type: électricité
 *         evolutionLevel: 2
 *         evolutionReference: Pichu
 *         weight: 6000
 *         height: 40
 *         age: 4
 *         price: 50_000
 *         category: pokémon
 *         stock: 5
 */

export const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["ROLE_USER", "ROLE_STORE_KEEPER", "ROLE_ADMIN", "ROLE_COMPTA"],
      default: "ROLE_USER",
    },
  },
  {
    timestamps: true,
    collection: "users",
    versionKey: false, // pour enlever le __v
  }
);
