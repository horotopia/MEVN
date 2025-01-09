import { Schema, model } from "mongoose";
import { addressSchema } from "../services/mongoose";

export interface Address {
  _id: string;
  userId: Schema.Types.ObjectId;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export const AddressModel = model<Address>('Address', addressSchema);
