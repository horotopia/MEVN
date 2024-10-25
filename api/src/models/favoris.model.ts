import mongoose, { Schema, Document } from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Favoris
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

export interface IFavoris extends Document {
    userId: mongoose.Types.ObjectId;
    productId: mongoose.Types.ObjectId;
}

const FavorisSchema: Schema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    productId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Products'
    }
}, {
    timestamps: true
});

export const Favoris = mongoose.model<IFavoris>("Favoris", FavorisSchema);
