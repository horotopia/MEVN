import mongoose, { Schema, Document } from "mongoose";

/**
 * @swagger
 * components:
 * schemas:
 *   Pictures:
 *     type: object
 *     required:
 *       - userId
 *       - name
 *       - description
 *     properties:
 *       userId:
 *         type: string
 *         description: L'identifiant de l'utilisateur
 *       name:
 *         type: string
 *         description: Le nom de l'image
 *       description:
 *         type: string
 *         description: La description de l'image
 *     example:
 *       userId: 5f4f6d7e5e5c5b5a5a4a5a5a
 *       name: image.jpg
 *       description: Une image de test
 */

export interface IPicture extends Document {
    userId: mongoose.Types.ObjectId;
    name: string;
    description: string;
}

const PictureSchema: Schema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

export const Picture = mongoose.model<IPicture>("Picture", PictureSchema);
