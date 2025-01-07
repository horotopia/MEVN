import { Schema, model } from "mongoose";
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
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

export type UpdateUser = Partial<User>;

const userSchema = new Schema<User>({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: String,
  tel: { type: String, required: true },
  address: { type: Schema.Types.ObjectId, ref: 'Address' },
  isEmailVerified: { type: Boolean, default: false },
  emailVerificationToken: String,
  emailVerificationTokenExpires: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, { timestamps: true });

const UserModel = model<User>('User', userSchema);

export async function findUser(email: string): Promise<User | null> {
  return UserModel.findOne({ email });
}

export async function findUserByVerificationToken(token: string): Promise<User | null> {
  return UserModel.findOne({ emailVerificationToken: token });
}

export async function findUserByResetToken(token: string): Promise<User | null> {
  return UserModel.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: new Date() }
  });
}

export async function updateUser(userId: string, update: UpdateUser): Promise<User | null> {
  return UserModel.findByIdAndUpdate(userId, update, { new: true });
}

export async function createUser(userData: Partial<User>): Promise<User> {
  return UserModel.create(userData);
}
