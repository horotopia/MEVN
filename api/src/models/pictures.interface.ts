import { Schema } from "mongoose";

export interface Pictures {
  _id: string;
  userId: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
  name: string;
  description: string;
}
