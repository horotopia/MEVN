import { Schema } from "mongoose";
import { Carts } from "../../../models";

/**
 * @swagger
 * components:
 *   schemas:
 *     Carts:
 *       type: object
 *       required:
 *         - userId
 *         - items
 *       properties:
 *         userId:
 *           type: string
 *           description: L'identifiant de l'utilisateur
 *         items:
 *           type: array
 *           description: Les produits du panier
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: L'identifiant du produit
 *               quantity:
 *                 type: integer
 *                 description: La quantité du produit
 *                 minimum: 1
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
