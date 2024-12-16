import { Schema } from "mongoose";
import { Carts } from "../../../models";

/**
 //* @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       required:
 *         - userId
 *         - items
 *       properties:
 *         userId:
 *           type: string
 *           description: L'identifiant de l'utilisateur
 *        items:
 *          type: object
 *          description: Les produits du panier
 */

export const cartsSchema = new Schema<Carts>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Products",
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
    collection: "carts",
    versionKey: false,
  }
);
