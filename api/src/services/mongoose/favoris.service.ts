import { Model } from "mongoose";
import { Favoris } from "../../models";
import { MongooseService } from "./mongoose.service";
import { favorisSchema } from "./schema";

export type CreateOrUpdateFavoris = Omit<
  Favoris,
  "_id" | "createdAt" | "updatedAt"
>;

export class FavorisService {
  readonly mongooseService: MongooseService;
  readonly model: Model<Favoris>;

  constructor(mongooseService: MongooseService) {
    this.mongooseService = mongooseService;
    const mongoose = this.mongooseService.mongoose;
    this.model = mongoose.model("Favoris", favorisSchema);
  }

  async createFavoris(favoris: CreateOrUpdateFavoris): Promise<Favoris> {
    const res = await this.model.create(favoris);
    return res;
  }

  async findFavorisById(id: string): Promise<Favoris | null> {
    const res = await this.model.findById(id);
    return res;
  }

  async findAllFavorisByUserId(userId: string): Promise<Favoris[]> {
    const res = await this.model.find({ userId });
    return res;
  }

  async deleteFavoris(id: string): Promise<Favoris | null> {
    const res = await this.model.findByIdAndDelete(id);
    return res;
  }

  async deleteAllFavorisByUserId(userId: string): Promise<void> {
    const res = await this.model.deleteMany({ userId });
  }
}
