import crypto from "crypto";

export * from "./bcrypt";
export * from "./security.utils";

export const generateResetToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};
