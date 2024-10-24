import mongoose, { Schema, Document } from "mongoose";

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
