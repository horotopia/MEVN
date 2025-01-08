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
    const res = await this.model.find({ userId }).populate("items.productId");
    return res;
  }

  async findAllOrdersByStatus(status: string): Promise<Orders[]> {
    const res = await this.model.find({ status });
    return res;
  }

  async findAllOrders(): Promise<Orders[]> {
    const res = await this.model.find().populate("userId").populate("items.productId");
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

  // calculateAverageOrderAmount
  async calculateAverageOrderAmount(): Promise<{ currentMonthOrder: number; lastMonthOrder: number; growthRateOrder: number }> {
    const date = new Date();

    const currentMonthOrder = date.getMonth();
    const currentYear = date.getFullYear();
    const lastMonthOrder = currentMonthOrder === 0 ? 11 : currentMonthOrder - 1;
    const lastYear = currentMonthOrder === 0 ? currentYear - 1 : currentYear;

    const currentMonthOrders = await this.model.find({
      status: "completed",
      createdAt: {
        $gte: new Date(currentYear, currentMonthOrder, 1),
        $lt: new Date(currentYear, currentMonthOrder + 1, 1),
      },
    });

    const lastMonthOrders = await this.model.find({
      status: "completed",
      createdAt: {
        $gte: new Date(lastYear, lastMonthOrder, 1),
        $lt: new Date(lastYear, lastMonthOrder + 1, 1),
      },
    });

    const currentMonthAverage = currentMonthOrders.length > 0
      ? currentMonthOrders.reduce((acc, order) => acc + order.totalAmount, 0) / currentMonthOrders.length
      : 0;

    const lastMonthAverage = lastMonthOrders.length > 0
      ? lastMonthOrders.reduce((acc, order) => acc + order.totalAmount, 0) / lastMonthOrders.length
      : 0;

    const growthRateOrder = lastMonthAverage > 0
      ? ((currentMonthAverage - lastMonthAverage) / lastMonthAverage) * 100
      : currentMonthAverage > 0
      ? 100
      : 0;

    return {
      currentMonthOrder: parseFloat(currentMonthAverage.toFixed(2)),
      lastMonthOrder: parseFloat(lastMonthAverage.toFixed(2)),
      growthRateOrder: parseFloat(growthRateOrder.toFixed(2)),
    };
  }

  async totalAmountOrdersByMonth(year: number): Promise<number[]> {
    const totalAmounts = [];
    let maxMonth = 12;
    if (year < 2024) {
      throw new Error("Invalid year");
    }
    if (year > new Date().getFullYear()) {
      throw new Error("Year is in the future");
    }
    if (year === new Date().getFullYear()) {
      maxMonth = new Date().getMonth()+1;
    }
    for (let i = 0; i < maxMonth; i++) {
      const orders = await this.model.find({
        status: "completed",
        createdAt: {
          $gte: new Date(year, i, 1),
          $lt: new Date(year, i + 1, 1),
        },
      });
      const totalAmount = orders.length > 0
        ? orders.reduce((acc, order) => acc + order.totalAmount, 0)
        : 0;
      totalAmounts.push(totalAmount);
    }
    return totalAmounts;
  }

  // // obtenir tous les produits vendus par nom (partie admin) ainsi que le nombre de fois qu'ils ont été vendus
  // async findAllProductsSoldByName(): Promise<any[]> {
  //   const orders = await this.model.find({ status: "completed" }).populate({ path: 'items.productId', select: 'product' });
  //   const products = orders.reduce((acc: Record<string, number>, order) => {
  //     order.items.forEach((item) => {
  //       const productName = item.productId.name;
  //       console.log("productName:",productName);
  //       if (acc[productName]) {
  //         acc[productName] += item.quantity;
  //       } else {
  //         acc[productName] = item.quantity;
  //       }
  //       console.log("acc:",acc);
  //     });
  //     return acc;
  //   }, {});
  //   return Object.keys(products).map((name) => ({
  //     name,
  //     quantity: products[name],
  //   }));
  // }
}
