import nodemailer from 'nodemailer';
import { Mail, MailData } from '../models/mail.model';
import { emailTemplates } from '../templates/emailTemplates';

type EmailTemplate = {
    confirmation: (username: string, confirmationLink: string) => string;
    passwordReset: (resetLink: string) => string;
    invoice: (username: string, invoiceLink: string) => string;
    orderConfirmation: (username: string, orderNumber: string, orderDetails: string) => string;
};

type TemplateData = {
    confirmation: {
        username: string;
        confirmationLink: string;
    };
    passwordReset: {
        resetLink: string;
    };
    invoice: {
        username: string;
        invoiceLink: string;
    };
    orderConfirmation: {
        username: string;
        orderNumber: string;
        orderDetails: string;
    };
};

interface TemplatedEmailOptions<T extends keyof TemplateData> {
    to: string;
    subject: string;
    template: T;
    data: TemplateData[T];
}

class MailService {
    private transporter: nodemailer.Transporter;
    private defaultFrom: string;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'mailhog',
            port: 1025,
            secure: false,
            ignoreTLS: true
        });

        this.defaultFrom = process.env.MAIL_FROM || 'pokeshop@gmail.com';
    }

    async sendEmail(mailData: MailData): Promise<void> {
        const mail = new Mail(mailData);
        mail.validate();

        await this.transporter.sendMail({
            from: mailData.from || this.defaultFrom,
            to: mail.to,
            subject: mail.subject,
            html: mail.htmlContent
        });
    }

    async sendTemplatedEmail<T extends keyof TemplateData>(
        options: TemplatedEmailOptions<T>
    ): Promise<void> {
        let htmlContent: string;

        switch(options.template) {
            case 'confirmation':
                const { username, confirmationLink } = options.data as TemplateData['confirmation'];
                htmlContent = emailTemplates.confirmation(username, confirmationLink);
                break;
            case 'passwordReset':
                const { resetLink } = options.data as TemplateData['passwordReset'];
                htmlContent = emailTemplates.passwordReset(resetLink);
                break;
            case 'invoice':
                const { username: invUsername, invoiceLink } = options.data as TemplateData['invoice'];
                htmlContent = emailTemplates.invoice(invUsername, invoiceLink);
                break;
            case 'orderConfirmation':
                const { username: orderUsername, orderNumber, orderDetails } = options.data as TemplateData['orderConfirmation'];
                htmlContent = emailTemplates.orderConfirmation(orderUsername, orderNumber, orderDetails);
                break;
            default:
                throw new Error('Template non reconnu');
        }

        await this.sendEmail({
            to: options.to,
            subject: options.subject,
            htmlContent
        });
    }
}

export const mailService = new MailService();

export const sendResetPasswordEmail = async (email: string, resetLink: string): Promise<void> => {
    const mailService = new MailService();
    const mailOptions: MailData = {
        from: process.env.MAIL_FROM,
        to: email,
        subject: 'Réinitialisation de votre mot de passe - PokéShop',
        htmlContent: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #C73D3D; text-align: center;">Réinitialisation de votre mot de passe</h1>
                <p>Bonjour,</p>
                <p>Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le lien ci-dessous pour définir un nouveau mot de passe :</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetLink}" style="background-color: #C73D3D; color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; display: inline-block;">
                        Réinitialiser mon mot de passe
                    </a>
                </div>
                <p>Ce lien est valable pendant 1 heure.</p>
                <p>Si vous n'avez pas demandé la réinitialisation de votre mot de passe, vous pouvez ignorer cet email.</p>
                <p>Cordialement,<br>L'équipe PokéShop</p>
            </div>
        `
    };

    try {
        await mailService.sendEmail(mailOptions);
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email de réinitialisation:', error);
        throw new Error('Erreur lors de l\'envoi de l\'email de réinitialisation');
    }
};
