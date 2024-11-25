import { Mongoose, connect } from "mongoose";
import { ProductService } from "./product.service";
import { UserService } from "./user.service";

export class MongooseService {
  private static instance?: MongooseService;

  readonly mongoose: Mongoose;
  readonly userService: UserService;
  readonly productService: ProductService;

  private constructor(mongoose: Mongoose) {
    this.mongoose = mongoose;
    this.userService = new UserService(this);
    this.productService = new ProductService(this);
  }

  public static async get(): Promise<MongooseService> {
    if (this.instance !== undefined) {
      return this.instance;
    }
    const connection = await this.openConnection();
    this.instance = new MongooseService(connection);
    return this.instance;
  }

  private static async openConnection(): Promise<Mongoose> {
    const connection = await connect(process.env.MONGODB_URI as string, {
      auth: {
        username: process.env.MONGODB_USERNAME,
        password: process.env.MONGODB_PASSWORD,
      },
      authSource: "admin",
      dbName: process.env.DATABASE_NAME,
    });
    return connection;
  }
}
