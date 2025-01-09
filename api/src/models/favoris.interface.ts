import { Schema, model } from "mongoose";
import { favorisSchema } from "../services/mongoose";

export interface Favoris {
  _id: string;
  userId: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
}

export const FavorisModel = model<Favoris>('Favoris', favorisSchema);
