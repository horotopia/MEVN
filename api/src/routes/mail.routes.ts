import express from 'express';
import { 
    sendConfirmationEmail, 
    sendPasswordResetEmail, 
    sendInvoiceEmail, 
    sendOrderConfirmationEmail 
} from '../controllers/mailController';

const router = express.Router();

router.post('/confirmation', sendConfirmationEmail);
router.post('/reset-password', sendPasswordResetEmail);
router.post('/invoice', sendInvoiceEmail);
router.post('/order-confirmation', sendOrderConfirmationEmail);

export default router; 