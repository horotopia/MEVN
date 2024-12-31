import { Schema } from "mongoose";
import { Favoris } from "../../../models";

/**
 * @swagger
 * components:
 *   schemas:
 *     Favoris:
 *       type: object
 *       required:
 *         - userId
 *         - productId
 *       properties:
 *         userId:
 *           type: string
 *           description: L'identifiant de l'utilisateur
 *         productId:
 *           type: string
 *           description: L'identifiant du produit
 *       example:
 *         userId: 5f4f6d7e5e5c5b5a5a4a5a5a
 *         productId: 5f4f6d7e5e5c5b5a5a4a5a5a
 */

export const favorisSchema = new Schema<Favoris>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Products",
    },
  },
  {
    timestamps: true,
    collection: "favoris",
    versionKey: false,
  }
);
