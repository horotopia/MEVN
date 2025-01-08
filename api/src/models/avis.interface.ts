import { Schema, model } from "mongoose";
import { avisSchema } from "../services/mongoose";

export interface Avis {
  _id: string;
  userId: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
  rating: number;
  comment: string;
}

export const AvisModel = model<Avis>('Avis', avisSchema);

