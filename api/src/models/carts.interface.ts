import { Schema, model } from "mongoose";
import { cartsSchema } from "../services/mongoose";

export interface Carts {
  _id: string;
  userId: Schema.Types.ObjectId;
  items: {
    productId: Schema.Types.ObjectId;
    quantity: Number;
  }[];
}

export const CartsModel = model<Carts>('Carts', cartsSchema);
