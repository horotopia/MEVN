import { Request, Response } from 'express';
import { sendMail } from '../services/mailService';
import { Mail } from '../models/mail.model';


export const sendConfirmationEmail = async (req: Request, res: Response) => {
    const { email, username } = req.body;

    try {
        const confirmationLink = `http://localhost:3000/confirmation?email=${email}`;

        const mailData = new Mail({
            to: email,
            subject: 'Confirme ton inscription',
            htmlContent: `
        <h1>Bienvenue, ${username} !</h1>
        <p>Merci de vous être inscrit. Cliquez sur le lien ci-dessous pour confirmer votre inscription :</p>
        <a href="${confirmationLink}">Confirmer mon inscription</a>
      `,
        });

        await sendMail(mailData);
        res.status(200).json({ message: 'E-mail de confirmation envoyé avec succès !' });
    } catch (error: any) {
        console.error('Erreur lors de l\'envoi de l\'e-mail de confirmation :', error.message);
        res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'e-mail.' });
    }
};


export const sendPasswordResetEmail = async (req: Request, res: Response) => {
    const { email, resetToken } = req.body;

    try {
        const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

        const mailData = new Mail({
            to: email,
            subject: 'Réinitialise ton mot de passe',
            htmlContent: `
        <h1>Réinitialisation du mot de passe</h1>
        <p>Clique sur le lien ci-dessous pour réinitialiser ton mot de passe :</p>
        <a href="${resetLink}">Réinitialiser mon mot de passe</a>
      `,
        });

        await sendMail(mailData);
        res.status(200).json({ message: 'E-mail de réinitialisation envoyé avec succès !' });
    } catch (error: any) {
        console.error('Erreur lors de l\'envoi de l\'e-mail de réinitialisation :', error.message);
        res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'e-mail.' });
    }
};

export const sendInvoiceEmail = async (req: Request, res: Response) => {
    const { email, username, invoiceLink } = req.body;

    try {
        const mailData = new Mail({
            to: email,
            subject: 'Votre facture est prête',
            htmlContent: `
        <h1>Bonjour, ${username}</h1>
        <p>Votre facture est disponible. Vous pouvez la consulter en cliquant sur le lien ci-dessous :</p>
        <a href="${invoiceLink}">Voir ma facture</a>
      `,
        });

        await sendMail(mailData);
        res.status(200).json({ message: 'E-mail de facture envoyé avec succès !' });
    } catch (error: any) {
        console.error('Erreur lors de l\'envoi de l\'e-mail de facture :', error.message);
        res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'e-mail.' });
    }
};

export const sendInvitationToResetPasswordEmail = async (req: Request, res: Response) => {
    const { email, username } = req.body;

    try {
        const resetLink = `http://localhost:3000/invitation-reset?email=${email}`;

        const mailData = new Mail({
            to: email,
            subject: 'Invitation à réinitialiser votre mot de passe',
            htmlContent: `
        <h1>Bonjour, ${username} !</h1>
        <p>Nous avons remarqué que vous avez peut-être besoin de réinitialiser votre mot de passe. Cliquez sur le lien ci-dessous :</p>
        <a href="${resetLink}">Réinitialiser mon mot de passe</a>
      `,
        });

        await sendMail(mailData);
        res.status(200).json({ message: 'Invitation envoyée avec succès !' });
    } catch (error: any) {
        console.error('Erreur lors de l\'envoi de l\'invitation :', error.message);
        res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'e-mail.' });
    }
};
