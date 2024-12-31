import { Schema } from "mongoose";
import { Orders, User, Product } from "../../../models";

/**
 * @swagger
 * components:
 *   schemas:
 *     Orders:
 *       type: object
 *       required:
 *         - userId
 *         - items
 *         - totalAmount
 *         - status
 *       properties:
 *         userId:
 *           type: string
 *           description: L'identifiant de l'utilisateur
 *         items:
 *           type: object
 *           description: Les produits de la commande
 *         totalAmount:
 *           type: number
 *           description: Le montant total de la commande
 *         status:
 *           type: string
 *           description: Le statut de la commande
 *       example:
 *         userId: 5f4f6d7e5e5c5b5a5a4a5a5a
 *         items: [
 *           {
 *             productId: 5f4f6d7e5e5c5b5a5a4a5a5a,
 *             quantity: 2,
 *             price: 10
 *           }
 *         ]
 *         totalAmount: 20
 *         status: pending
 */

export const ordersSchema = new Schema<Orders>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    collection: "orders",
    versionKey: false,
  }
);
