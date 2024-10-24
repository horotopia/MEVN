import { Router } from 'express';
import { getFavorisByUserId,
    getFavorisById,
    createFavoris,
    updateFavoris,
    deleteFavoris
} from '../controllers/favorisController';
import { authenticateToken } from '../middlewares/jwt';
import { validateObjectId } from '../middlewares/validate';

const router = Router();

router.get('/user/:id', authenticateToken, validateObjectId, getFavorisByUserId);


router.get('/:id', authenticateToken, validateObjectId, getFavorisById);


router.post('/', authenticateToken, createFavoris);


router.put('/:id', authenticateToken, validateObjectId, updateFavoris);


router.delete('/:id', authenticateToken, validateObjectId, deleteFavoris);

export default router;
