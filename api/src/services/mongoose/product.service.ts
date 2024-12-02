import { Model } from "mongoose";
import { Product } from "../../models/product.interface";
import { MongooseService } from "./mongoose.service";
import { productSchema } from "./schema";

export type CreateProduct = Omit<Product, "_id" | "createdAt" | "updatedAt">;
export type UpdateProduct = Omit<Product, "createdAt" | "updatedAt">;

export class ProductService {
  readonly mongooseService: MongooseService;
  readonly model: Model<Product>;

  constructor(mongooseService: MongooseService) {
    this.mongooseService = mongooseService;
    const mongoose = this.mongooseService.mongoose;
    this.model = mongoose.model("Product", productSchema);
  }

  // create
  async createProduct(product: CreateProduct): Promise<Product> {
    const res = await this.model.create(product);
    return res;
  }
  // read one
  async findProductById(id: string): Promise<Product | null> {
    const res = await this.model.findById(id);
    return res;
  }
  // read all
  async findAllProducts(): Promise<Product[]> {
    const res = await this.model.find();
    return res;
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
}
