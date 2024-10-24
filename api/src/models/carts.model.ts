import mongoose, { Schema, Document } from "mongoose";

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       required:
 *         - userId
 *         - items
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         userId:
 *           type: string
 *           description: L'identifiant de l'utilisateur
 *        items:
 *          type: string
 *          description: Les produits du panier
 *        createdAt:
 *          type: string
 *          description: La date de création de l'avis
 *        updatedAt:
 *          type: string
 *          description: La date de mise à jour de l'avis
 */

export interface ICart extends Document {
    userId: mongoose.Types.ObjectId;
    items: {
        productId: mongoose.Types.ObjectId;
        quantity: number;
    }[];
}

const CartSchema: Schema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    items: [
        {
            productId: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: 'Products'
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ]
}, {
    timestamps: true
});

export const Cart = mongoose.model<ICart>("Cart", CartSchema);
