import { NextFunction, Request, Response, Router } from "express";
import { authenticateToken } from "../middlewares/jwt";
import { validateObjectId } from "../middlewares/validate";
import { MongooseService } from "../services/mongoose/mongoose.service";

export class AddressController {
  /**
   * @swagger
   * /api/address/:
   *   post:
   *     summary: Create a new address
   *     tags: [Address]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             $ref: '#/components/schemas/Addresses'
   *     responses:
   *       201:
   *         description: Address created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               $ref: '#/components/schemas/Addresses'
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Not found
   *       500:
   *         description: Internal server error
   */
  async createAddress(req: Request, res: Response, next: NextFunction) {
    try {
      if (
        !req.body ||
        !req.body.userId ||
        !req.body.street ||
        !req.body.city ||
        !req.body.postalCode ||
        !req.body.country
      ) {
        res.status(400);
        throw new Error("Missing required fields");
      }
      const mongooseService = await MongooseService.get();
      const address = await mongooseService.addressService.createAddress({
        userId: req.body.userId,
        street: req.body.street,
        city: req.body.city,
        postalCode: req.body.postalCode,
        country: req.body.country,
      });
      res.status(201).json(address);
      return;
    } catch (error) {
      if (
        error instanceof Error &&
        error.name === "MongooseError" &&
        error.message.startsWith("E11000 duplicate key")
      ) {
        res.status(409);
        new Error("Address already exists");
      }
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  /**
   * @swagger
   * /api/address/{userId}:
   *   get:
   *     summary: Get all addresses of a user
   *     tags: [Address]
   *     parameters:
   *       - in: path
   *         name: userId
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the user to retrieve addresses
   *     responses:
   *       200:
   *         description: Addresses found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Addresses'
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Addresses not found
   *       500:
   *         description: Internal server error
   */
  async getAllAddressesByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.params || !req.params.userId) {
        res.status(400);
        throw new Error("Missing required fields");
      }
      const mongooseService = await MongooseService.get();
      const addresses =
        await mongooseService.addressService.findAllAddressesByUserId(
          req.params.userId
        );
      res.status(200).json(addresses);
      return;
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  /**
   * @swagger
   * /api/address/{id}:
   *   put:
   *     summary: Update an address
   *     tags: [Address]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the address to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Addresses'
   *     responses:
   *       200:
   *         description: Address updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Addresses'
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Not found
   *       500:
   *         description: Internal server error
   */
  async updateAddress(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params.id || !req.body) {
        res.status(400);
        throw new Error("Missing required fields");
      }
      const mongooseService = await MongooseService.get();
      const address = await mongooseService.addressService.updateAddress(
        req.params.id,
        req.body
      );
      if (!address) {
        res.status(404);
        throw new Error("Address not found");
      }
      res.status(200).json(address);
      return;
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  /**
   * @swagger
   * /api/address/{id}:
   *   delete:
   *     summary: Delete an address
   *     tags: [Address]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the address to delete
   *     responses:
   *       204:
   *         description: Address deleted successfully
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Not found
   *       500:
   *         description: Internal server error
   */
  async deleteAddress(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.params || !req.params.id) {
        res.status(400);
        throw new Error("Missing required fields");
      }
      const mongooseService = await MongooseService.get();
      const address = await mongooseService.addressService.deleteAddress(
        req.params.id
      );
      if (!address) {
        res.status(404);
        throw new Error("Address not found");
      }
      res.status(204);
      return;
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  /**
   * @swagger
   * /api/address/u/{userId}:
   *   delete:
   *     summary: Delete all addresses of a user
   *     tags: [Address]
   *     parameters:
   *       - in: path
   *         name: userId
   *         schema:
   *           type: string
   *         required: true
   *         description: ID of the user whose addresses will be deleted
   *     responses:
   *       204:
   *         description: Addresses deleted successfully
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Not found
   *       500:
   *         description: Internal server error
   */
  async deleteAllAddressesByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.params || !req.params.userId) {
        res.status(400);
        throw new Error("Missing required fields");
      }
      const mongooseService = await MongooseService.get();
      await mongooseService.addressService.anonymise(req.params.userId);
      res.status(204);
      return;
    } catch (error) {
      if (!res.statusCode) {
        res.status(500);
      }
      next(error);
    }
  }

  buildRouter(): Router {
    const router = Router();
    router.post("/", authenticateToken, this.createAddress);
    router.get("/:userId", authenticateToken, this.getAllAddressesByUserId);
    router.put("/:id", authenticateToken, validateObjectId, this.updateAddress);
    router.delete(
      "/:id",
      authenticateToken,
      validateObjectId,
      this.deleteAddress
    );
    router.delete(
      "/u/:userId",
      authenticateToken,
      this.deleteAllAddressesByUserId
    );
    return router;
  }
}
