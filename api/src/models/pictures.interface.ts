import { Schema } from "mongoose";

export interface Pictures {
  _id: string;
  userId: Schema.Types.ObjectId;
  name: string;
  description: string;
}
