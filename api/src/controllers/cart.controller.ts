import { Request, Response } from "express";
import logger from "../config/logger";
import { Cart } from "../models/carts.model";

const getCartsByUserId = async (req: Request, res: Response) => {
    try {
        const carts = await Cart.find({ userId: req.params.id }).populate('userId').populate('items.productId');
        if (!carts) {
            throw new Error('Carts not found');
        }
        res.status(200).json(carts);
    } catch (err: Error | any) {
        logger.error(`Error retrieving cart: ${err}`);
        res.status(500).json({ message: err.message });
    }
};

const getCartById = async (req: Request, res: Response) => {
    try {
        const cart = await Cart.findById(req.params.id).populate('userId').populate('items.productId');
        if (!cart) {
            throw new Error('Cart not found');
        }
        res.status(200).json(cart);
    } catch (err: Error | any) {
        logger.error(`Error retrieving cart: ${err}`);
        res.status(500).json({ message: err.message });
    }
};

const createCart = async (req: Request, res: Response) => {
    try {
        const newCart = new Cart(req.body);
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err: Error | any) {
        logger.error(`Error creating cart: ${err}`);
        res.status(500).json({ message: err.message });
    }
};

const updateCart = async (req: Request, res: Response) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCart) {
            throw new Error('Cart not found');
        }
        res.status(200).json(updatedCart);
    } catch (err: Error | any) {
        logger.error(`Error updating cart: ${err}`);
        res.status(400).json({ message: err.message });
    }
};

const deleteCart = async (req: Request, res: Response) => {
    try {
        const deletedCart = await Cart.findByIdAndDelete(req.params.id);
        if (!deletedCart) {
            throw new Error('Cart not found');
        }
        res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (err: Error | any) {
        res.status(500).json({ message: err.message });
    }
};

export {
    getCartsByUserId,
    getCartById,
    createCart,
    updateCart,
    deleteCart
};
