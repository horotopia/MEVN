import { Model } from "mongoose";
import { User, Pictures, Address } from "../../models";
import { MongooseService } from "./mongoose.service";
import { userSchema, picturesSchema, addressSchema } from "./schema";

import { AddressService } from "./address.service";

export type CreateUser = Omit<User, "_id" | "createdAt" | "updatedAt">;
export type UpdateUser = Omit<User, "_id" | "createdAt" | "updatedAt">;

export class UserService {
  readonly mongooseService: MongooseService;
  readonly model: Model<User>;
  readonly pictureModel: Model<Pictures>;
  readonly addressModel: Model<Address>;

  constructor(mongooseService: MongooseService) {
    this.mongooseService = mongooseService;
    const mongoose = this.mongooseService.mongoose;
    this.model = mongoose.model("User", userSchema);
    this.pictureModel = mongoose.model("Picture", picturesSchema);
    this.addressModel = mongoose.model("Address", addressSchema);
  }

  // register
  async createUser(user: CreateUser): Promise<User> {
    const res = await this.model.create(user);
    return res;
  }

  // login
  async findUser(email: string): Promise<User | null> {
    const user = await this.model.findOne({
      email: email,
    });
    if (!user) {
      return null;
    }

    const userId = user._id;
    const pictures = await this.pictureModel.find({ userId: { $in: userId } });

    const userPictures = pictures.filter(picture => picture.userId.toString() === userId.toString());
    const userWithImages = {
      ...user.toObject(),
      pictures: userPictures
    };

    return userWithImages;
  }

  // read one
  async findUserById(id: string): Promise<User | null> {
    const user = await this.model.findById(id);
    if (!user) {
      return null;
    }

    const userId = user._id;
    const pictures = await this.pictureModel.find({ userId: { $in: userId } });

    const userPictures = pictures.filter(picture => picture.userId.toString() === userId.toString());
    const userWithImages = {
      ...user.toObject(),
      pictures: userPictures
    };

    return userWithImages;
  }

  // read all
  async findAllUsers(): Promise<User[]> {
    const users = await this.model.find();

    const userIds = users.map(user => user._id);
    const pictures = await this.pictureModel.find({ userId: { $in: userIds } });

    const usersWithImages = users.map(user => {
      const userPictures = pictures.filter(picture => picture.userId.toString() === user._id.toString());
      return {
        ...user.toObject(),
        pictures: userPictures
      };
    });

    return usersWithImages;
  }

  // update
  async updateUser(id: string, user: UpdateUser): Promise<User | null> {
    const res = await this.model.findByIdAndUpdate(
      id,
      { $set: user },
      {
        new: true,
        runValidators: true,
      }
    );
    return res;
  }

  // delete
  async deleteUser(id: string): Promise<User | null> {
    const res = await this.model.findByIdAndUpdate(
      id,
      {
        $set: {
          name: "Anonyme",
          email: `${id}@deleted.com`,
          password: "deleted",
        }
      },
      {
        new: true,
        runValidators: true,
      }
    );

    const addressService = new AddressService(this.mongooseService);
    await addressService.anonymise(id);

    return res;
  }
}
