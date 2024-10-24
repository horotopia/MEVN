import mongoose, { Schema, Document } from "mongoose";

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
