import { Schema } from "mongoose";

export interface Avis {
  _id: string;
  userId: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
  rating: number;
  comment: string;
}
