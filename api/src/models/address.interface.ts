import { Schema } from "mongoose";

export interface Address {
  _id: string;
  userId: Schema.Types.ObjectId;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}
