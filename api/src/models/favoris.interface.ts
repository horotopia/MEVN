import { Schema } from "mongoose";

export interface Favoris {
  _id: string;
  userId: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
}
