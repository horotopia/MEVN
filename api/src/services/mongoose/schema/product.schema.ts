import { Schema } from "mongoose";
import { Product } from "../../../models";

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
 *           habitat: Le habitat du produit
 *           habitude: Les habitudes du produit
 *           required: true
 *           enum: [combat, acier, eau, féé, normal, psy, vol, spectre, poison, feu, électrique, plante]
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

export const productSchema = new Schema<Product>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    type: {
      type: String,
      required: true,
      enum: [
        "combat",
        "acier",
        "eau",
        "féé",
        "normal",
        "psy",
        "vol",
        "spectre",
        "poison",
        "feu",
        "électrique",
        "plante",
      ],
      default: "feu",
    },
    evolutionLevel: {
      type: Number,
      required: true,
      min: 1,
      max: 3,
    },
    evolutionReference: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    weight: {
      type: Number,
      required: true,
      min: 0,
    },
    height: {
      type: Number,
      required: true,
      min: 0,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      enum: ["pokémon", "pokéball", "baie", "objets", "médicaments"], // Exemples de catégories
      default: "pokémon",
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    }
  },
  {
    timestamps: true,
    collection: "product",
    versionKey: false,
  }
);
