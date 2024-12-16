import { Schema } from "mongoose";
import { User } from "../../../models";

//swagger doc pour user utilisant l'objet address

/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: Le nom de l'utilisateur
 *         email:
 *           type: string
 *           description: L'email de l'utilisateur
 *         password:
 *           type: string
 *           description: Le mot de passe de l'utilisateur
 *         role:
 *           type: string
 *           enum: [ROLE_USER, ROLE_STORE_KEEPER, ROLE_ADMIN, ROLE_COMPTA]
 *           default: ROLE_USER
 *           description: Le rôle de l'utilisateur
 *         address:
 *           type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: L'id de l'utilisateur
 *           description: L'adresse de l'utilisateur
 *       example:
 *         name: John Doe
 *         email: john.doe@toto.com
 *         password: password
 *         role: ROLE_USER
 *         address: []
 */

export const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["ROLE_USER", "ROLE_STORE_KEEPER", "ROLE_ADMIN", "ROLE_COMPTA"],
      default: "ROLE_USER",
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
  },
  {
    timestamps: true,
    collection: "users",
    versionKey: false, // pour enlever le __v
  }
);
