import { Model } from "mongoose";
import { Product, Pictures, Orders } from "../../models";
import { MongooseService } from "./mongoose.service";
import { productSchema, picturesSchema, ordersSchema } from "./schema";

export type CreateProduct = Omit<Product, "_id" | "createdAt" | "updatedAt">;
export type UpdateProduct = Omit<Product, "createdAt" | "updatedAt">;

export class ProductService {
  readonly mongooseService: MongooseService;
  readonly model: Model<Product>;
  readonly pictureModel: Model<Pictures>;
  readonly ordersModel: Model<Orders>;

  constructor(mongooseService: MongooseService) {
    this.mongooseService = mongooseService;
    const mongoose = this.mongooseService.mongoose;
    this.model = mongoose.model("Product", productSchema);
    this.pictureModel = mongoose.model("Picture", picturesSchema);
    this.ordersModel = mongoose.model("Orders", ordersSchema);
  }

  // create
  async createProduct(product: CreateProduct): Promise<Product> {
    const res = await this.model.create(product);
    return res;
  }

  // read one
  async findProductById(id: string): Promise<Product | null> {
    const product = await this.model.findById(id);
    if (!product) {
      return null;
    }

    const productId = product._id;
    const pictures = await this.pictureModel.find({ productId: { $in: productId } });

    const productPictures = pictures.filter(picture => picture.productId.toString() === productId.toString());
    const productWithImages = {
      ...product.toObject(),
      pictures: productPictures
    };

    return productWithImages;
  }

  // read all
  async findAllProducts(): Promise<Product[]> {
    const products = await this.model.find();
    const productIds = products.map(product => product._id);
    const pictures = await this.pictureModel.find({ productId: { $in: productIds } });

    const productsWithImages = products.map(product => {
      const productPictures = pictures.filter(picture => picture.productId.toString() === product._id.toString());
      return {
        ...product.toObject(),
        pictures: productPictures
      };
    });

    return productsWithImages;
  }

  // read all of a category
  async findProductsByAttribute(
    attribute: string,
    value: string | number
  ): Promise<Product[]> {
    const res = await this.model.find({ [attribute]: value });
    return res;
  }

  // update
  async updateProduct(id: string, product: UpdateProduct): Promise<Product> {
    const res = await this.model.findByIdAndUpdate(
      id,
      { $set: product },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!res) {
      throw new Error("Product not found");
    }
    return res;
  }

  // delete
  async deleteProduct(id: string): Promise<Product | null> {
    const res = await this.model.findByIdAndDelete(id);
    return res;
  }

  // sold
  async countProductSellInMonth(): Promise<{ currrentMonth: number, lastMonth: number, growthRate: number }> {
    const date = new Date();
    
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const currentMonthOrders = await this.ordersModel.find({
      status: "completed",
      createdAt: {
        $gte: new Date(currentYear, currentMonth, 1),
        $lt: new Date(currentYear, currentMonth + 1, 1)
      }
    });

    const lastMonthOrders = await this.ordersModel.find({
      status: "completed",
      createdAt: {
        $gte: new Date(lastYear, lastMonth, 1),
        $lt: new Date(lastYear, lastMonth + 1, 1)
      }
    });

    console.log(currentMonthOrders, lastMonthOrders);

    const currentMonthSell = currentMonthOrders.reduce((acc, order) => acc + order.items.reduce((acc, item) => acc + item.quantity, 0), 0);

    const lastMonthSell = lastMonthOrders.reduce((acc, order) => acc + order.items.reduce((acc, item) => acc + item.quantity, 0), 0);

    const growthRate = lastMonthSell > 0 
        ? ((currentMonthSell - lastMonthSell) / lastMonthSell) * 100 
        : (currentMonthSell > 0 ? 100 : 0);

    return {
      currrentMonth: currentMonthSell,
      lastMonth: lastMonthSell,
      growthRate: parseFloat(growthRate.toFixed(2)),
    }
  }
}
