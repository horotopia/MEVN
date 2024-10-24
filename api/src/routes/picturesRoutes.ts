import { Router } from 'express';
import { getPicturesByUserId,
    getPictureById,
    createPicture,
    updatePicture,
    deletePicture
} from '../controllers/picturesController';
import { authenticateToken } from '../middlewares/jwt';
import { validateObjectId } from '../middlewares/validate';

const router = Router();


router.get('/user/:id', authenticateToken, validateObjectId, getPicturesByUserId);


router.get('/:id', authenticateToken, validateObjectId, getPictureById);


router.post('/', authenticateToken, createPicture);


router.put('/:id', authenticateToken, validateObjectId, updatePicture);


router.delete('/:id', authenticateToken, validateObjectId, deletePicture);

export default router;
