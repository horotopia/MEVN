import { Request, Response } from "express";
import logger from "../config/logger";
import { Favoris } from "../models/favoris.model";

const getFavorisByUserId = async (req: Request, res: Response) => {
    try {
        const favoris = await Favoris.find({ userId: req.params.id }).populate('userId').populate('items.productId');
        if (!favoris) {
            throw new Error('Favoris not found');
        }
        res.status(200).json(favoris);
    } catch (err: Error | any) {
        logger.error(`Error retrieving favoris: ${err}`);
        res.status(500).json({ message: err.message });
    }
}

const getFavorisById = async (req: Request, res: Response) => {
    try {
        const favoris = await Favoris.findById(req.params.id).populate('userId').populate('items.productId');
        if (!favoris) {
            throw new Error('Favoris not found');
        }
        res.status(200).json(favoris);
    } catch (err: Error | any) {
        logger.error(`Error retrieving favoris: ${err}`);
        res.status(500).json({ message: err.message });
    }
}

const createFavoris = async (req: Request, res: Response) => {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
        logger.error('Missing required fields');
        res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const newFavoris = new Favoris({ userId, productId });
        const savedFavoris = await newFavoris.save();
        res.status(200).json(savedFavoris);
    } catch (err: Error | any) {
        logger.error(`Error creating favoris: ${err}`);
        res.status(500).json({ message: 'Error creating favoris', err });
    }
}

const updateFavoris = async (req: Request, res: Response) => {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
        logger.error('Missing required fields');
        res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const updatedFavoris = await Favoris.findByIdAndUpdate(req.params.id, { userId, productId }, { new: true });
        if (!updatedFavoris) {
            throw new Error('Favoris not found');
        }
        res.status(200).json(updatedFavoris);
    } catch (err: Error | any) {
        logger.error(`Error updating favoris: ${err}`);
        res.status(500).json({ message: err.message });
    }
}

const deleteFavoris = async (req: Request, res: Response) => {
    try {
        const deletedFavoris = await Favoris.findByIdAndDelete(req.params.id);
        if (!deletedFavoris) {
            throw new Error('Favoris not found');
        }
        res.status(200).json(deletedFavoris);
    } catch (err: Error | any) {
        logger.error(`Error deleting favoris: ${err}`);
        res.status(500).json({ message: err.message });
    }
}

export {
    getFavorisByUserId,
    getFavorisById,
    createFavoris,
    updateFavoris,
    deleteFavoris
}
