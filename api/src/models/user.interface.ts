import { Timestamps } from "./timestamps.interface";

export interface User extends Timestamps {
  _id: string;
  name?: string;
  email: string;
  password: string;
  role?: string;
}
