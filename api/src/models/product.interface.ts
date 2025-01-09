import { model } from "mongoose";
import { Timestamps } from "./timestamps.interface";
import { productSchema } from "../services/mongoose";

export interface Product extends Timestamps {
  _id: string;
  name: string;
  description: string;
  habitat: string;
  habitude: string;
  type: string;
  evolutionLevel: number;
  evolutionReference: string;
  weight: number;
  height: number;
  age: number;
  price: number;
  category: string;
  stock: number;
}

export const ProductModel = model<Product>('Product', productSchema);