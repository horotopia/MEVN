import { Schema } from "mongoose";
import { Product } from "../../../models/product.interface";

export const productSchema = new Schema<Product>({
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
    enum: ["feu", "eau", "plante", "électricité"],
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
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
