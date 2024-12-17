import { Model } from "mongoose";
import { Avis } from "../../models";
import { MongooseService } from "./mongoose.service";
import { avisSchema } from "./schema";

export type CreateOrUpdateAvis = Omit<Avis, "_id" | "createdAt" | "updatedAt">;
export type AnonymiseAvis = Omit<Avis, "userId">;

export class AvisService {
  readonly mongooseService: MongooseService;
  readonly model: Model<Avis>;

  constructor(mongooseService: MongooseService) {
    this.mongooseService = mongooseService;
    const mongoose = this.mongooseService.mongoose;
    this.model = mongoose.model("Avis", avisSchema);
  }

  async createAvis(avis: CreateOrUpdateAvis): Promise<Avis> {
    const res = await this.model.create(avis);
    return res;
  }

  async findAllAvisByProductId(productId: string): Promise<Avis[]> {
    const res = await this.model.find({ productId });
    return res;
  }

  async findAllAvisByUserId(userId: string): Promise<Avis[]> {
    const res = await this.model.find({ userId });
    return res;
  }

  async updateAvis(id: string, avis: CreateOrUpdateAvis): Promise<Avis | null> {
    const res = await this.model.findByIdAndUpdate(
      id,
      { $set: avis },
      {
        new: true,
        runValidators: true,
      }
    );
    return res;
  }

  async deleteAvis(id: string): Promise<Avis> {
    const res = await this.model.findByIdAndDelete(id);
    if (!res) {
      throw new Error("Avis not found");
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
