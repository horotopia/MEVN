import { Schema } from "mongoose";
import { Avis } from "../../../models";

/**
 * @swagger
 * components:
 *   schemas:
 *     Avis:
 *       type: object
 *       required:
 *         - userId
 *         - productId
 *         - rating
 *         - comment
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         userId:
 *           type: string
 *           description: L'identifiant de l'utilisateur
 *         productId:
 *           type: string
 *           description: L'identifiant du produit
 *         rating:
 *           type: number
 *           description: La note donnée par l'utilisateur
 *         comment:
 *           type: string
 *           description: Le commentaire de l'utilisateur
 *       example:
 *         userId: 5f4f6d7e5e5c5b5a5a4a5a5a
 *         productId: 5f4f6d7e5e5c5b5a5a4a5a5a
 *         rating: 5
 *         comment: "Super produit !"
 */

export const avisSchema = new Schema<Avis>(
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
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    collection: "avis",
    versionKey: false,
  }
);
