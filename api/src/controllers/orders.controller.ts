import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";
import { Orders } from "../models/orders.model";

const getOrdersByUserId = async (req: Request, res: Response) => {
    try {
        const orders = await Orders.find({ userId: req.params.id }).populate('userId').populate('items.productId');
        if (!orders) {
            res.status(404).json({ message: 'Orders not found' });
            return;
        }
        res.status(200).json(orders);
    } catch (err: Error | any) {
        logger.error(`Error retrieving orders: ${err}`);
        res.status(500).json({ message: 'Error fetching orders', err });
    }
}

const getOrderById = async (req: Request, res: Response) => {
    try {
        const order = await Orders.findById(req.params.id).populate('userId').populate('items.productId');
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        res.status(200).json(order);
    } catch (err: Error | any) {
        logger.error(`Error retrieving order: ${err}`);
        res.status(500).json({ message: 'Error fetching order', err });
    }
}

const createOrders = async (req: Request, res: Response) => {
    const { userId, items, totalAmount, status } = req.body;
    if (!userId || !items || !totalAmount || !status) {
        logger
        res.status(500).json({ message: 'Missing required fields.' });
        return;
    }

    try {
        const newOrders = new Orders({ userId, items, totalAmount, status });
        const savedOrders = await newOrders.save();
        res.status(201).json(savedOrders);
    } catch (err: Error | any) {
        logger.error(`Error creating orders: ${err}`);
        res.status(400).json({ message: 'Error creating orders', err });
    }
}

const updateOrders = async (req: Request, res: Response) => {
    const { userId, items, totalAmount, status } = req.body;
    if (!userId || !items || !totalAmount || !status) {
        logger
        res.status(500).json({ message: 'Missing required fields.' });
        return;
    }

    try {
        const updatedOrders = await Orders.findByIdAndUpdate(req.params.id, { userId, items, totalAmount, status }, { new: true });
        if (!updatedOrders) {
            res.status(404).json({ message: 'Orders not found' });
            return;
        }
        res.status(200).json(updatedOrders);
    } catch (err: Error | any) {
        logger.error(`Error updating orders: ${err}`);
        res.status(400).json({ message: 'Error updating orders', err });
    }
}

const deleteOrders = async (req: Request, res: Response) => {
    try {
        const deletedOrders = await Orders.findByIdAndDelete(req.params.id);
        if (!deletedOrders) {
            res.status(404).json({ message: 'Orders not found' });
            return;
        }
        res.status(200).json({ message: 'Orders deleted' });
    } catch (err: Error | any) {
        logger.error(`Error deleting orders: ${err}`);
        res.status(400).json({ message: 'Error deleting orders', err });
    }
}

export {
    getOrdersByUserId,
    getOrderById,
    createOrders,
    updateOrders,
    deleteOrders
}
