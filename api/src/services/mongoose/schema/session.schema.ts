import { Schema } from "mongoose";
import { Session } from "../../../models";

/**
 * @swagger
 * components:
 *   schemas:
 *     Session:
 *       type: object
 *       required:
 *         - userAgent
 *         - user
 *       properties:
 *         expirationDate:
 *           type: string
 *           format: date-time
 *           description: La date d'expiration de la session.
 *         userAgent:
 *           type: string
 *           description: L'agent utilisateur.
 *         user:
 *           type: string
 *           description: L'identifiant de l'utilisateur.
 *       example:
 *         userAgent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36
 *         user: 5f4f6d7e5e5c5b5a5a4a5a5a5a
 */

export const sessionSchema = new Schema<Session>(
  {
    expirationDate: {
      type: Date,
    },
    userAgent: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "sessions",
    versionKey: false,
  }
);
