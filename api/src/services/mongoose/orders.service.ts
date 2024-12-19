import { Model } from "mongoose";
import { Orders } from "../../models";
import { MongooseService } from "./mongoose.service";
import { ordersSchema } from "./schema";

export type CreateOrUpdateOrders = Omit<
  Orders,
  "_id" | "createdAt" | "updatedAt"
>;

export class OrdersService {
  readonly mongooseService: MongooseService;
  readonly model: Model<Orders>;

  constructor(mongooseService: MongooseService) {
    this.mongooseService = mongooseService;
    const mongoose = this.mongooseService.mongoose;
    this.model = mongoose.model("Orders", ordersSchema);
  }

  async createOrder(order: CreateOrUpdateOrders): Promise<Orders> {
    let totalAmount = 0;
    order.items.forEach((item: any) => {
      totalAmount += item.quantity * item.price;
    });
    if (totalAmount !== order.totalAmount) {
      throw new Error("Invalid total amount");
    }
    const res = await this.model.create(order);
    return res;
  }

  async findOrdersById(id: string): Promise<Orders | null> {
    const res = await this.model.findById(id);
    return res;
  }

  async findAllOrdersByUserId(userId: string): Promise<Orders[]> {
    const res = await this.model.find({ userId });
    return res;
  }

  async findAllOrdersByStatus(status: string): Promise<Orders[]> {
    const res = await this.model.find({ status });
    return res;
  }

  async findAllOrders(): Promise<Orders[]> {
    const res = await this.model.find();
    return res;
  }

  // update something in order
  async updateOrder(
    id: string,
    order: CreateOrUpdateOrders
  ): Promise<Orders | null> {
    const res = await this.model.findByIdAndUpdate(
      id,
      { $set: order },
      { new: true, runValidators: true }
    );
    return res;
  }

  async deleteOrder(id: string): Promise<Orders | null> {
    const res = await this.model.findByIdAndDelete(id);
    if (!res) {
      throw new Error("Order not found");
    }
    return res;
  }

  async anonymise(userId: string): Promise<void> {
    const res = await this.model.updateMany(
      { userId },
      { $set: { userId: "anonyme" } }
    );
  }
}
