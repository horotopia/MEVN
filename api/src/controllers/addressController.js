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

export { getAddressesByUserId };
