import mongoose, { Schema, Document } from "mongoose";

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
