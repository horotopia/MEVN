import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";
import { Address } from "../models/address.model";

const getAddressesByUserId = async (req: Request, res: Response) => {
    const id = req.params.userId;

    try {
        const address = await Address.find({ userId: id });
        if (!address) {
            throw new Error("Addresses not found.");
        }
    
        res.status(200).json(address);
    } catch (err: Error | any) {
        logger.error(`Error retrieving addresses: ${err}`);
        res.status(500).json({ message: err.message });
    }
}

const postAddress = async (req: Request, res: Response) => {
    const { userId, street, city, postalCode, country } = req.body;
    if (!userId || !street || !city || !postalCode || !country) {
        logger.error("Missing required fields");
        res.status(400).json({ message: "Missing required fields" });
    }
    try {
        const address = await Address.create({ userId, street, city, postalCode, country });
        if (!address) {
            throw new Error("Error creating address");
        }

        res.status(200).json(address);
    } catch (err: Error | any) {
        logger.error(`Error creating address: ${err}`);
        res.status(500).json({ message: err.message });
    }
}

const updateAddress = async (req: Request, res: Response) => {
    const { street, city, postalCode, country } = req.body;
    if (!street || !city || !postalCode || !country) {
        logger.error("Missing required fields");
        res.status(400).json({ message: "Missing required fields" });
    }
    try {
        const address = await Address.findByIdAndUpdate(req.params.id, { street, city, postalCode, country }, { new: true });
        if (!address) {
            throw new Error("Address not found");
        }
        res.status(200).json(address);
    } catch (err: Error | any) {
        logger.error(`Error updating address: ${err}`);
        res.status(500).json({ message: err.message });
    }
}

const deleteAddress = async (req: Request, res: Response) => {
    try {
        const address = await Address.findByIdAndDelete(req.params.id);
        if (!address) {
            throw new Error("Address not found");
        }

        res.status(200).json({ address, message: "Address deleted" });
    } catch (err: Error | any) {
        logger.error(`Error deleting address: ${err}`);
        res.status(500).json({ message: err.message });
    }
}

export {
    getAddressesByUserId,
    postAddress,
    updateAddress,
    deleteAddress
};
