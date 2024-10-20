import mongoose, { Schema, Document } from "mongoose";

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     Addresses:
 *       type: object
 *       required:
 *         - userId
 *         - street
 *         - city
 *         - postalCode
 *         - country
 *       properties:
 *         userId:
 *           type: string
 *           description: L'identifiant de l'utilisateur
 *         street:
 *           type: string
 *           description: La rue
 *         city:
 *           type: string
 *           description: La ville
 *         postalCode:
 *           type: string
 *           description: Le code postal
 *         country:
 *           type: string
 *           description: Le pays
 *       example:
 *         userId: 5f4f6d7e5e5c5b5a5a4a5a5a
 *         street: 5th Avenue
 *         city: New York
 *         postalCode: 10001
 *         country: USA
 */

export interface IAddress {
    userId: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
}

export interface IAddressDocument extends IAddress, Document {
}

const addressSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
});

export const Address = mongoose.model<IAddressDocument>("addresses", addressSchema);
