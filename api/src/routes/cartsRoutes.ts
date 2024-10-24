import { Router } from 'express';
import { getCartsByUserId,
    getCartById,
    createCart,
    updateCart,
    deleteCart
} from '../controllers/cartController';
import { authenticateToken } from "../middlewares/jwt";
import { validateObjectId } from '../middlewares/validate';

const router = Router();


router.get('/user/:id', authenticateToken, validateObjectId, getCartsByUserId);


router.get('/:id', authenticateToken, validateObjectId, getCartById);


router.post('/', authenticateToken, createCart);


router.put('/:id', authenticateToken, validateObjectId, updateCart);


router.delete('/:id', authenticateToken, validateObjectId, deleteCart);

export default router;
