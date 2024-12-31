import { Model } from "mongoose";
import { Carts } from "../../models";
import { MongooseService } from "./mongoose.service";
import { cartsSchema } from "./schema";

export type CreateOrUpdateCart = Omit<Carts, "_id" | "createdAt" | "updatedAt">;

export class CartsService {
  readonly mongooseService: MongooseService;
  readonly model: Model<Carts>;

  constructor(mongooseService: MongooseService) {
    this.mongooseService = mongooseService;
    const mongoose = this.mongooseService.mongoose;
    this.model = mongoose.model("Carts", cartsSchema);
  }

  async createCart(cart: CreateOrUpdateCart): Promise<Carts> {
    const res = await this.model.create(cart);
    return res;
  }

  async findCartById(id: string): Promise<Carts | null> {
    const res = await this.model.findById(id);
    return res;
  }

  async findCartsByUserId(userId: string): Promise<Carts[]> {
    const res = await this.model.find({ userId });
    return res;
  }

  async updateCart(
    id: string,
    cart: CreateOrUpdateCart
  ): Promise<Carts | null> {
    const res = await this.model.findByIdAndUpdate(
      id,
      { $set: cart },
      {
        new: true,
        runValidators: true,
      }
    );
    return res;
  }

  async deleteCart(id: string): Promise<Carts | null> {
    const res = await this.model.findByIdAndDelete(id);
    return res;
  }

  async deleteCartsByUserId(userId: string): Promise<void> {
    const res = await this.model.deleteMany({ userId });
  }
}
