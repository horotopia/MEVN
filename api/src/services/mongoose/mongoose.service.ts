import { config } from "dotenv";
import { Mongoose, connect } from "mongoose";
import { AddressService } from "./address.service";
import { AvisService } from "./avis.service";
import { CartsService } from "./carts.service";
import { FavorisService } from "./favoris.service";
import { OrdersService } from "./orders.service";
import { PicturesService } from "./pictures.service";
import { ProductService } from "./product.service";
import { SessionService } from "./session.service";
import { UserService } from "./user.service";

config();
export class MongooseService {
  private static instance?: MongooseService;

  readonly addressService: AddressService;
  readonly avisService: AvisService;
  readonly cartsService: CartsService;
  readonly favorisService: FavorisService;
  readonly mongoose: Mongoose;
  readonly ordersService: OrdersService;
  readonly picturesService: PicturesService;
  readonly productService: ProductService;
  readonly sessionService: SessionService;
  readonly userService: UserService;

  private constructor(mongoose: Mongoose) {
    this.mongoose = mongoose;
    this.userService = new UserService(this);
    this.sessionService = new SessionService(this);
    this.productService = new ProductService(this);
    this.picturesService = new PicturesService(this);
    this.ordersService = new OrdersService(this);
    this.favorisService = new FavorisService(this);
    this.cartsService = new CartsService(this);
    this.avisService = new AvisService(this);
    this.addressService = new AddressService(this);
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
