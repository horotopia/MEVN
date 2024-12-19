import { Request, Response } from 'express';
import { mailService } from '../services/mailService';

export const sendConfirmationEmail = async (req: Request, res: Response) => {
    const { email, username } = req.body;

    try {
        const confirmationLink = `${process.env.FRONTEND_URL}/confirmation?email=${email}`;
        
        await mailService.sendTemplatedEmail({
            to: email,
            subject: 'Confirme ton inscription',
            template: 'confirmation',
            data: { username, confirmationLink }
        });

        res.status(200).json({ message: 'E-mail de confirmation envoyé avec succès !' });
    } catch (error: any) {
        console.error('Erreur lors de l\'envoi de l\'e-mail de confirmation :', error.message);
        res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'e-mail.' });
    }
};

export const sendPasswordResetEmail = async (req: Request, res: Response) => {
    const { email, resetToken } = req.body;

    try {
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        
        await mailService.sendTemplatedEmail({
            to: email,
            subject: 'Réinitialise ton mot de passe',
            template: 'passwordReset',
            data: { link: resetLink }
        });

        res.status(200).json({ message: 'E-mail de réinitialisation envoyé avec succès !' });
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'e-mail.' });
    }
};

export const sendInvoiceEmail = async (req: Request, res: Response) => {
    const { email, username, invoiceLink } = req.body;

    try {
        await mailService.sendTemplatedEmail({
            to: email,
            subject: 'Votre facture est prête',
            template: 'invoice',
            data: { username, link: invoiceLink }
        });

        res.status(200).json({ message: 'E-mail de facture envoyé avec succès !' });
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'e-mail.' });
    }
};

export const sendInvitationToResetPasswordEmail = async (req: Request, res: Response) => {
    const { email, username } = req.body;

    try {
        const resetLink = `${process.env.FRONTEND_URL}/invitation-reset?email=${email}`;
        
        await mailService.sendTemplatedEmail({
            to: email,
            subject: 'Invitation à réinitialiser votre mot de passe',
            template: 'passwordReset',
            data: { link: resetLink }
        });

        res.status(200).json({ message: 'Invitation envoyée avec succès !' });
    } catch (error: any) {
        res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'e-mail.' });
    }
};
