import { Router } from 'express';
import {
    getAvisByUserId,
    getAvisById,
    createAvis,
    updateAvis,
    deleteAvis
} from "../controllers/avisController";
import { authenticateToken } from "../middlewares/jwt";
import { validateObjectId } from '../middlewares/validate';

const router = Router();


router.get('/user/:id', authenticateToken, validateObjectId, getAvisByUserId);

router.get('/:id', authenticateToken, validateObjectId, getAvisById);

router.post('/', authenticateToken, createAvis);

router.put('/:id', authenticateToken, validateObjectId, updateAvis);

router.delete('/:id', authenticateToken, validateObjectId, deleteAvis);

export default router;
