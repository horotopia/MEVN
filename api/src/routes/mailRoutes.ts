import express from 'express';
import {
    sendConfirmationEmail,
    sendPasswordResetEmail,
    sendInvoiceEmail,
    sendInvitationToResetPasswordEmail,
} from '../controllers/mailController';



const router = express.Router();

/**
 * @swagger
 * /api/mail/send-confirmation:
 *   post:
 *     summary: Envoie un e-mail de confirmation
 *     description: Cette route permet d'envoyer un e-mail de confirmation à un utilisateur.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SendConfirmationRequest'
 *     responses:
 *       200:
 *         description: E-mail envoyé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "E-mail envoyé avec succès !"
 *       500:
 *         description: Erreur lors de l'envoi de l'e-mail.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur lors de l'envoi de l'e-mail."
 */


router.post('/send-confirmation', sendConfirmationEmail);
router.post('/send-password-reset', sendPasswordResetEmail);
router.post('/send-invoice', sendInvoiceEmail);
router.post('/send-invitation-reset', sendInvitationToResetPasswordEmail);

export default router;
