import { Request, Response, Router } from "express";
import logger from "../config/logger";
import { MongooseService } from "../services/mongoose/mongoose.service";

export class ProductController {
  async createProduct(req: Request, res: Response) {
    if (
      !req.body ||
      !req.body.name ||
      !req.body.description ||
      !req.body.type ||
      !req.body.evolutionLevel ||
      !req.body.evolutionReference ||
      !req.body.weight ||
      !req.body.height ||
      !req.body.age ||
      !req.body.price ||
      !req.body.category ||
      !req.body.stock
    ) {
      res.status(400).end();
      return;
    }
    const mongooseService = await MongooseService.get();
    try {
      const product = await mongooseService.productService.createProduct({
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        evolutionLevel: req.body.evolutionLevel,
        evolutionReference: req.body.evolutionReference,
        weight: req.body.weight,
        height: req.body.height,
        age: req.body.age,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock,
      });
      res.status(201).json(product);
    } catch (error) {
      if (
        error instanceof Error &&
        error.name === "MongooseError" &&
        error.message.startsWith("E11000 duplicate key")
      ) {
        logger.http("409: ", error.message);
        res.status(409).end();
        return;
      }
      logger.error(error);
      res.status(500).end();
      return;
    }
  }

  async getOneProduct(req: Request, res: Response) {
    if (!req.params.id) {
      res.status(400).end();
      return;
    }
    const mongooseService = await MongooseService.get();
    try {
      const product = await mongooseService.productService.findProductById(
        req.params.id
      );
      if (!product) {
        res.status(404).end();
        return;
      }
      res.status(200).json(product);
      return;
    } catch (error) {
      logger.error(error);
      res.status(500).end();
    }
  }

  async getProducts(req: Request, res: Response) {
    const mongooseService = await MongooseService.get();
    try {
      const products = await mongooseService.productService.findAllProducts();
      if (!products) {
        res.status(404).end();
        return;
      }
      res.status(200).json(products);
      return;
    } catch (error) {
      logger.error(error);
      res.status(500).end();
      return;
    }
  }

  async getProductByAttribute(req: Request, res: Response) {
    if (!req.params.attribute || !req.params.value) {
      res.status(400).end();
      return;
    }
    const mongooseService = await MongooseService.get();
    try {
      const products =
        await mongooseService.productService.findProductsByAttribute(
          req.params.attribute,
          req.params.value
        );
      if (!products) {
        res.status(404).end();
        return;
      }
      res.status(200).json(products);
      return;
    } catch (error) {
      logger.error(error);
      res.status(500).end();
      return;
    }
  }

  async updateProduct(req: Request, res: Response) {
    if (!req.params.id || !req.body) {
      res.status(400).end();
      return;
    }
    const mongooseService = await MongooseService.get();
    try {
      const product = await mongooseService.productService.updateProduct({
        _id: req.params.id,
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        evolutionLevel: req.body.evolutionLevel,
        evolutionReference: req.body.evolutionReference,
        weight: req.body.weight,
        height: req.body.height,
        age: req.body.age,
        price: req.body.price,
        category: req.body.category,
        stock: req.body.stock,
      });
      if (!product) {
        res.status(404).end();
        return;
      }
      res.status(200).json(product);
      return;
    } catch (error) {
      logger.error(error);
      res.status(500).end();
      return;
    }
  }

  async deleteProduct(req: Request, res: Response) {
    if (!req.params.id) {
      res.status(400).end();
      return;
    }
    const mongooseService = await MongooseService.get();
    try {
      const product = await mongooseService.productService.deleteProduct(
        req.params.id
      );
      if (!product) {
        res.status(404).end();
        return;
      }
      res.status(200).json(product);
      return;
    } catch (error) {
      logger.error(error);
      res.status(500).end();
      return;
    }
  }

  buildRouter(): Router {
    const router = Router();
    router.post("/", this.createProduct.bind(this));
    router.get("/:id", this.getOneProduct.bind(this));
    router.get("/", this.getProducts.bind(this));
    router.get("/:attribute/:value", this.getProductByAttribute.bind(this));
    router.put("/:id", this.updateProduct.bind(this));
    router.delete("/:id", this.deleteProduct.bind(this));
    return router;
  }
}
