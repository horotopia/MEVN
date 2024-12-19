import { Model } from "mongoose";
import { User } from "../../models/user.interface";
import { MongooseService } from "./mongoose.service";
import { userSchema } from "./schema";

export type CreateUser = Omit<User, "_id" | "name" | "createdAt" | "updatedAt">;
export type UpdateUser = Omit<User, "_id" | "createdAt" | "updatedAt">;

export class UserService {
  readonly mongooseService: MongooseService;
  readonly model: Model<User>;

  constructor(mongooseService: MongooseService) {
    this.mongooseService = mongooseService;
    const mongoose = this.mongooseService.mongoose;
    this.model = mongoose.model("User", userSchema);
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
    // findOne permet de récuperer 1 enregistrement avec le filtre
    // la condition du filtre utilise un AND entre chaque champs
    return user;
  }

  // read one
  async findUserById(id: string): Promise<User | null> {
    const res = await this.model.findById(id);
    return res;
  }

  // read all
  async findAllUsers(): Promise<User[]> {
    const res = await this.model.find();
    return res;
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
    const res = await this.model.findByIdAndDelete(id);
    return res;
  }
}
