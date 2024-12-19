import {Schema} from "mongoose";
import {Session} from "../../../models";

export const sessionSchema = new Schema<Session>({
    expirationDate: {
        type: Date
    },
    userAgent: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
    collection: 'sessions',
    versionKey: false
});