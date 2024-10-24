import { Router } from 'express';
import { getOrdersByUserId,
    getOrderById,
    createOrders,
    updateOrders,
    deleteOrders
} from '../controllers/ordersController';
import { authenticateToken } from '../middlewares/jwt';
import { validateObjectId } from '../middlewares/validate';

const router = Router();

router.get('/user/:id', authenticateToken, validateObjectId, getOrdersByUserId);


router.get('/:id', authenticateToken, validateObjectId, getOrderById);


router.post('/', authenticateToken, createOrders);


router.put('/:id', authenticateToken, validateObjectId, updateOrders);


router.delete('/:id', authenticateToken, validateObjectId, deleteOrders);

export default router;
