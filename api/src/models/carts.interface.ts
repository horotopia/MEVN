import { Schema } from "mongoose";

export interface Carts {
  _id: string;
  userId: Schema.Types.ObjectId;
  items: {
    productId: Schema.Types.ObjectId;
    quantity: Number;
  }[];
}
