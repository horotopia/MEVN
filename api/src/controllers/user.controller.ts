import { Request, Response } from "express";
import logger from "../config/logger";
import { Address } from "../models/address.model";
import { User } from '../models/user.model';

const getUsers = async (res: Response) => {
  try {
    const result = await User.find();

    res.status(200).json(result);
  } catch (err: Error | any) {
    logger.error(`Error retrieving users: ${err}`);
    res.status(500).json({ message: err.message });
  }
};

const postUser = async (req: Request, res: Response) => {
  try {
    const result = await User.create(req.body);

    res.status(201).json(result);
  } catch (err: Error | any) {
    logger.error(`Error displaying user: ${err}`);
    res.status(500).json({ message: err.message });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await User.findById(req.params.id);
    if (!result) {
      res.status(404);
      throw new Error("User not found.");
    }

    res.status(200).json(result);
  } catch (err: Error | any) {
    logger.error(`Error retrieving user: ${err}`);
    res.status(500).json({ message: err.message });
  }
};

const putUser = async (req: Request, res: Response) => {
  try {
    const result = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!result) {
      res.status(404);
      throw new Error("User not found.");
    }

    res.status(200).json(result);
  } catch (err: Error | any) {
    logger.error(`Error updating user: ${err}`);
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId)

    if (!user) {
      throw new Error("User not found");
    }

    user.name = "deleted";
    user.email = userId + "@deleted.com";
    user.password = "deleted";
    user.save();

    const address = await Address.find({ userId: userId });

    if (address) {
      address.forEach(async (address) => {
        address.street = "deleted";
        address.city = "deleted";
        address.postalCode = "deleted";
        address.country = "deleted";
        await address.save();
      });
    }

    res.status(204).json({ success: true, message: "User deleted successfully" });
  } catch (err: Error | any) {
    logger.error(`Error deleting user: ${err}`);
    res.status(500).json({ message: err.message });
  }
};

export { deleteUser, getUser, getUsers, postUser, putUser };
