import { Request, Response } from "express";
import logger from "../config/logger";
import { Avis } from "../models/avis.model";

const getAvisByUserId = async (req: Request, res: Response) => {
    try {
        const avis = await Avis.find({ userId: req.params.userId });
        if (!avis) {
            throw new Error("Avis not found.");
        }

        res.status(200).json(avis);
    } catch (err: Error | any) {
        logger.error(`Error retrieving avis: ${err}`);
        res.status(500).json({ message: err.message });
    }
}

const getAvisById = async (req: Request, res: Response) => {
    try {
        const avis = await Avis.find({ productId: req.params.id });
        if (!avis) {
            throw new Error("Avis not found.");
        }
        res.status(200).json(avis);
    } catch (err: Error | any) {
        logger.error(`Error retrieving avis: ${err}`);
        res.status(500).json({ message: 'Error fetching avis', err });
    }
};

const createAvis = async (req: Request, res: Response) => {
    const { userId, productId, rating, comment } = req.body;
    if (!userId || !productId || !rating || !comment) {
        res.status(500).json({ message: 'Missing required fields.' });
        return;
    }

    try {
        const newAvis = new Avis({ userId, productId, rating, comment });
        const savedAvis = await newAvis.save();
        res.status(201).json(savedAvis);
    } catch (err: Error | any) {
        logger.error(`Error creating avis: ${err}`);
        res.status(500).json({ message: err.message });
    }
};

const updateAvis = async (req: Request, res: Response) => {
    const { userId, productId, rating, comment } = req.body;
    if (!userId || !productId || !rating || !comment) {
        res.status(500).json({ message: 'Missing required fields.' });
        return;
    }

    try {
        const updatedAvis = await Avis.findByIdAndUpdate(req.params.id, { userId, productId, rating, comment }, { new: true });
        if (!updatedAvis) {
            throw new Error("Avis not found.");
        }
        res.status(200).json(updatedAvis);
    } catch (err: Error | any) {
        logger.error(`Error updating avis: ${err}`);
        res.status(500).json({ message: err.message });
    }
};

const deleteAvis = async (req: Request, res: Response) => {
    try {
        const deletedAvis = await Avis.findByIdAndDelete(req.params.id);
        if (!deletedAvis) {
            throw new Error("Avis not found.");
        }
        res.status(200).json({ deletedAvis, message: 'Avis deleted successfully' });
    } catch (err: Error | any) {
        logger.error(`Error deleting avis: ${err}`);
        res.status(500).json({ message: err.message });
    }
};

export {
    getAvisByUserId,
    getAvisById,
    createAvis,
    updateAvis,
    deleteAvis
};
