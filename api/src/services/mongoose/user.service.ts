import { Model } from "mongoose";
import { User, Pictures, Address } from "../../models";
import { MongooseService } from "./mongoose.service";
import { userSchema, picturesSchema, addressSchema } from "./schema";

import { AddressService } from "./address.service";

export type CreateUser = Omit<User, "_id" | "createdAt" | "updatedAt">;
export type UpdateUser = Omit<User, "_id" | "createdAt" | "updatedAt">;

export type IUser = Omit<User, "password">;

export class UserService {
  readonly mongooseService: MongooseService;
  readonly model: Model<User>;
  readonly pictureModel: Model<Pictures>;
  readonly addressModel: Model<Address>;

  constructor(mongooseService: MongooseService) {
    this.mongooseService = mongooseService;
    const mongoose = this.mongooseService.mongoose;
    try {
      this.model = mongoose.model<User>("User");
    } catch (error) {
      this.model = mongoose.model<User>("User", userSchema);
    }
    try {
      this.pictureModel = mongoose.model<Pictures>("Picture");
    } catch (error) {
      this.pictureModel = mongoose.model<Pictures>("Picture", picturesSchema);
    }
    try {
      this.addressModel = mongoose.model<Address>("Address");
    } catch (error) {
      this.addressModel = mongoose.model<Address>("Address", addressSchema);
    }
  }

  // register
  async createUser(user: CreateUser): Promise<IUser> {
    const res = await this.model.create(user);
    return res;
  }

  // login
  async findUser(email: string): Promise<IUser | null> {
    const user = await this.model.findOne({
      email: email,
    });
    if (!user) {
      return null;
    }

    if (!user.isEmailVerified && user.role !== 'ROLE_ADMIN') {
      throw new Error('Votre compte n\'est pas encore vérifié. Veuillez vérifier vos emails.');
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
  async findUserById(id: string): Promise<IUser | null> {
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
  async findAllUsers(): Promise<IUser[]> {
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
  async updateUser(id: string, update: Partial<User>): Promise<IUser | null> {
    return this.model.findByIdAndUpdate(id, update, { new: true });
  }

  // delete
  async deleteUser(id: string): Promise<IUser | null> {
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

  // stat
  async countUsersByMonth(): Promise<{ currentMonthUser: number; lastMonthUser: number; growthRateUser: number }> {
    const date = new Date();

    const currentMonthUser = date.getMonth();
    const currentYear = date.getFullYear();
    const lastMonthUser = currentMonthUser === 0 ? 11 : currentMonthUser - 1;
    const lastYear = currentMonthUser === 0 ? currentYear - 1 : currentYear;

    const currentMonthUsers = await this.model.countDocuments({
      createdAt: {
        $gte: new Date(currentYear, currentMonthUser, 1),
        $lt: new Date(currentYear, currentMonthUser + 1, 1),
      },
    });

    const lastMonthUsers = await this.model.countDocuments({
      createdAt: {
        $gte: new Date(lastYear, lastMonthUser, 1),
        $lt: new Date(lastYear, lastMonthUser + 1, 1),
      },
    });

    const growthRateUser = lastMonthUsers > 0
      ? ((currentMonthUsers - lastMonthUsers) / lastMonthUsers) * 100
      : currentMonthUsers > 0
        ? 100
        : 0;

    return {
      currentMonthUser: currentMonthUsers,
      lastMonthUser: lastMonthUsers,
      growthRateUser: parseFloat(growthRateUser.toFixed(2)),
    };
  }

  async findUserByVerificationToken(token: string): Promise<IUser | null> {
    const user = await this.model.findOne({ emailVerificationToken: token });
    return user;
  }
}
