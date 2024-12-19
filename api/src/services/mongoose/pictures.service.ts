import { Model } from "mongoose";
import { Pictures } from "../../models";
import { MongooseService } from "./mongoose.service";
import { picturesSchema } from "./schema";

export type CreateOrUpdatePictures = Omit<
  Pictures,
  "_id" | "createdAt" | "updatedAt"
>;

export class PicturesService {
  readonly mongooseService: MongooseService;
  readonly model: Model<Pictures>;

  constructor(mongooseService: MongooseService) {
    this.mongooseService = mongooseService;
    const mongoose = this.mongooseService.mongoose;
    this.model = mongoose.model("Pictures", picturesSchema);
  }

  async createPicture(pictures: CreateOrUpdatePictures): Promise<Pictures> {
    const res = await this.model.create(pictures);
    return res;
  }

  async findAllPicturesByUserId(userId: string): Promise<Pictures[]> {
    const res = await this.model.find({ userId });
    return res;
  }

  async findPicturesById(id: string): Promise<Pictures | null> {
    const res = await this.model.findById(id);
    return res;
  }

  async updatePictures(
    id: string,
    pictures: CreateOrUpdatePictures
  ): Promise<Pictures | null> {
    const res = await this.model.findByIdAndUpdate(
      id,
      { $set: pictures },
      {
        new: true,
        runValidators: true,
      }
    );
    return res;
  }

  async deletePictures(id: string): Promise<Pictures | null> {
    const res = await this.model.findByIdAndDelete(id);
    return res;
  }

  async deleteAllPicturesByUserId(userId: string): Promise<void> {
    const res = await this.model.deleteMany({ userId });
  }
}
