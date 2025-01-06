import { Schema } from "mongoose";
import { Timestamps } from "./timestamps.interface";

export interface User extends Timestamps {
  _id: string;
  name?: string;
  email: string;
  password: string;
  role?: string;
  tel: string;
  address?: Schema.Types.ObjectId;
  isEmailVerified: boolean;
  emailVerificationToken?: string | null;
  emailVerificationTokenExpires?: Date | null;
}

export type UpdateUser = Partial<User>;
