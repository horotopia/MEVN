import express from "express";
import { sendMail } from "../services/mailService";

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

router.post('/send-confirmation', async (req, res) => {
    const { email, username } = req.body;
    const confirmationLink = 'http://localhost:3000/confirmation';

    try {
        await sendMail(email, 'Confirme ton inscription',
            `<h1>Bienvenue, ${username} !</h1>
            <p>Confirme ton inscription en cliquant ici :</p>
            <a href="${confirmationLink}">Lien de Confirmation</a>`);
        res.status(200).json({ message: 'E-mail envoyé avec succès !' });
    } catch (error) {
        res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'envoi de l\'e-mail.' });

    }
});

export default router;