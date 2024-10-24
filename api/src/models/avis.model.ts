import mongoose, { Schema, Document } from "mongoose";

/**
 * @swagger
 *
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
 *        productId:
 *          type: string
 *          description: L'identifiant du produit
 *        rating:
 *          type: number
 *          description: La note donnée par l'utilisateur
 *        comment:
 *          type: string
 *          description: Le commentaire de l'utilisateur
 *        createdAt:
 *          type: string
 *          description: La date de création de l'avis
 *        updatedAt:
 *          type: string
 *          description: La date de mise à jour de l'avis
 */

export interface IAvis extends Document {
    userId: mongoose.Types.ObjectId;
    productId: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
}

const AvisSchema: Schema = new Schema({
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
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
},
{
    timestamps: true
});

export const Avis = mongoose.model<IAvis>("Avis", AvisSchema);
