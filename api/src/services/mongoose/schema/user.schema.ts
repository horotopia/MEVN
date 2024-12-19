import { Schema } from "mongoose";
import { User } from "../../../models";

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       required:
 *         - userId
 *       properties:
 *         userId:
 *           type: string
 *           description: L'id de l'utilisateur
 *         street:
 *           type: string
 *           description: La rue de l'adresse
 *         city:
 *           type: string
 *           description: La ville de l'adresse
 *         postalCode:
 *           type: string
 *           description: Le code postal de l'adresse
 *         country:
 *           type: string
 *           description: Le pays de l'adresse
 *       example:
 *         userId: "643d0fd5c07b4a2e88b074c9"
 *         street: "123 Rue de Paris"
 *         city: "Paris"
 *         postalCode: "75000"
 *         country: "France"
 *
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
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
 *           $ref: '#/components/schemas/Address'
 *           description: L'adresse de l'utilisateur
 *       example:
 *         name: John Doe
 *         email: john.doe@toto.com
 *         password: password
 *         role: ROLE_USER
 *         address:
 *           userId: "643d0fd5c07b4a2e88b074c9"
 *           street: "123 Rue de Paris"
 *           city: "Paris"
 *           postalCode: "75000"
 *           country: "France"
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
    versionKey: false,
  }
);
