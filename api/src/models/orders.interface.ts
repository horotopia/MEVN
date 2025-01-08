import { Schema, model } from "mongoose";
import { ordersSchema } from "../services/mongoose";

export interface Orders {
  _id: string;
  userId: Schema.Types.ObjectId;
  items: {
    productId: Schema.Types.ObjectId;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: string;
}

export const OrdersModel = model<Orders>('Orders', ordersSchema);
