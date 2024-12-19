import { Timestamps } from "./timestamps.interface";

export interface Product extends Timestamps {
  _id: string;
  name: string;
  description: string;
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
