import logger from "../config/logger.js";
import { Address } from "../models/address.model.js";

const getAddressesByUserId = async (req, res, next) => {
    const id = req.params.userId;
    if (!id) {
        logger.error("No id provided");
        return res.status(400).json({ message: "No id provided" });
    }
    try {
        const result = await Address.find({ userId: id });
    
        res.status(200).setHeader("Content-Type", "application/json").json(result);
    } catch (err) {
        logger.error(`Error retrieving addresses: ${err}`);
        res.status(500).json({ message: err.message });
    }
}

const postAddress = async (req, res, next) => {
    const { userId, street, city, postalCode, country } = req.body;
    if (!userId || !street || !city || !postalCode || !country) {
        logger.error("Missing required fields");
        return res.status(400).json({ message: "Missing required fields" });
    }
    try {
        const address = await Address.create({ userId, street, city, postalCode, country });
        res.status(201).json(address);
    } catch (err) {
        logger.error(`Error creating address: ${err}`);
        res.status(500).json({ message: err.message });
    }
}

const updateAddress = async (req, res, next) => {
    const id = req.params.id;
    const { street, city, postalCode, country } = req.body;
    if (!id || !street || !city || !postalCode || !country) {
        logger.error("Missing required fields");
        return res.status(400).json({ message: "Missing required fields" });
    }
    try {
        const address = await Address.findByIdAndUpdate(id, { street, city, postalCode, country }, { new: true });
        res.status(200).json(address);
    } catch (err) {
        logger.error(`Error updating address: ${err}`);
        res.status(500).json({ message: err.message });
    }
}

const deleteAddress = async (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        logger.error("No id provided");
        return res.status(400).json({ message: "No id provided" });
    }
    try {
        await Address.findByIdAndDelete(id);
        res.status(204).json();
    } catch (err) {
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
