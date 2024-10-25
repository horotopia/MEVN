import { Request, Response } from "express";
import logger from "../config/logger";
import { Picture } from "../models/pictures.model";

const getPicturesByUserId = async (req: Request, res: Response) => {
    try {
        const picture = await Picture.find({ userId: req.params.id });
        if (!picture) {
            throw new Error('Picture not found');
        }
        res.status(200).json(picture);
    } catch (err: Error | any) {
        logger.error(`Error retrieving picture: ${err}`);
        res.status(500).json({ message: err.message });
    }
}

const getPictureById = async (req: Request, res: Response) => {
    try {
        const picture = await Picture.findById(req.params.id);
        if (!picture) {
            throw new Error('Picture not found');
        }
        res.status(200).json(picture);
    } catch (err: Error | any) {
        logger.error(`Error retrieving picture: ${err}`);
        res.status(500).json({ message: err.message });
    }
}

const createPicture = async (req: Request, res: Response) => {
    const { userId, name, description } = req.body;
    if (!name || !description || !userId) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
    }

    try {
        const newPicture = new Picture({ name, description, userId });
        const savedPicture = await newPicture.save();
        res.status(200).json(savedPicture);
    } catch (err: Error | any) {
        logger.error(`Error creating picture: ${err}`);
        res.status(500).json({ message: err.message });
    }
}

const updatePicture = async (req: Request, res: Response) => {
    const { userId, name, description } = req.body;
    if (!name || !description || !userId) {
        logger.error('Missing required fields');
        res.status(400).json({ message: 'Missing required fields' });
        return;
    }

    try {
        const updatedPicture = await Picture.findByIdAndUpdate(req.params.id, { name, description, userId }, { new: true });
        if (!updatedPicture) {
            throw new Error('Picture not found');
        }

        res.status(200).json(updatedPicture);
    } catch (err: Error | any) {
        logger.error(`Error updating picture: ${err}`);
        res.status(500).json({ message: err.message });
    }
}

const deletePicture = async (req: Request, res: Response) => {
    try {
        const deletedPicture = await Picture.findByIdAndDelete(req.params.id);
        if (!deletedPicture) {
            throw new Error('Picture not found');
        }
        res.status(200).json(deletedPicture);
    } catch (err: Error | any) {
        logger.error(`Error deleting picture: ${err}`);
        res.status(500).json({ message: err.message });
    }
}

export {
    getPicturesByUserId,
    getPictureById,
    createPicture,
    updatePicture,
    deletePicture
}
