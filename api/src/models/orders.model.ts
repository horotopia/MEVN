import mongoose, { Schema, Document } from "mongoose";

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

export interface IOrder extends Document {
    userId: mongoose.Types.ObjectId;
    items: {
        productId: mongoose.Types.ObjectId;
        quantity: number;
        price: number;
    }[];
    totalAmount: number;
    status: string;
}

const OrderSchema: Schema = new Schema({
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
            },
            price: {
                type: Number,
                required: true,
                min: 0
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    }
}, {
    timestamps: true
});

export const Orders = mongoose.model<IOrder>("Orders", OrderSchema);
