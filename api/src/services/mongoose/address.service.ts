import { Model } from "mongoose";
import { Address } from "../../models";
import { MongooseService } from "./mongoose.service";
import { addressSchema } from "./schema";

export type CreateOrUpdateAddress = Omit<
  Address,
  "_id" | "createdAt" | "updatedAt"
>;

export class AddressService {
  readonly mongooseService: MongooseService;
  readonly model: Model<Address>;

  constructor(mongooseService: MongooseService) {
    this.mongooseService = mongooseService;
    const mongoose = this.mongooseService.mongoose;
    this.model = mongoose.model("Address", addressSchema);
  }

  async createAddress(address: CreateOrUpdateAddress): Promise<Address> {
    const res = await this.model.create(address);
    return res;
  }

  async findAllAddressesByUserId(userId: string): Promise<Address[]> {
    const res = await this.model.find({ userId });
    return res;
  }

  async updateAddress(
    id: string,
    address: CreateOrUpdateAddress
  ): Promise<Address | null> {
    const res = await this.model.findByIdAndUpdate(
      id,
      { $set: address },
      {
        new: true,
        runValidators: true,
      }
    );
    return res;
  }

  async deleteAddress(id: string): Promise<Address | null> {
    const res = await this.model.findByIdAndDelete(id);
    return res;
  }

  async anonymise(userId: string): Promise<void> {
    const res = await this.model.updateMany(
      { userId },
      {
        $set: {
          street: "Anonyme",
          city: "Anonyme",
          postalCode: "Anonyme",
          country: "Anonyme"
        }
      }
    );
  }
}
