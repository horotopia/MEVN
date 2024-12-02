import { config } from "dotenv";
import { Mongoose, connect } from "mongoose";
import { ProductService } from "./product.service";
import { SessionService } from "./session.service";
import { UserService } from "./user.service";
config();
export class MongooseService {
  private static instance?: MongooseService;

  readonly mongoose: Mongoose;
  readonly userService: UserService;
  readonly sessionService: SessionService;
  readonly productService: ProductService;

  private constructor(mongoose: Mongoose) {
    this.mongoose = mongoose;
    this.userService = new UserService(this);
    this.sessionService = new SessionService(this);
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
    const connection = await connect(process.env.MONGO_URI as string, {
      auth: {
        username: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD,
      },
      authSource: "admin",
      dbName: process.env.MONGO_DB,
    });
    return connection;
  }
}
