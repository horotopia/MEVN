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

  async createOrders(order: CreateOrUpdateOrders): Promise<Orders> {
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

  async anonymise(userId: string): Promise<void> {
    const res = await this.model.updateMany(
      { userId },
      { $set: { userId: "anonyme" } }
    );
  }
}
