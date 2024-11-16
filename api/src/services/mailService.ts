import transporter from '../config/transporter';
import { Mail } from '../models/mail.model';

export const sendMail = async (mailData: Mail): Promise<void> => {
    try {
        mailData.validate();

        const info = await transporter.sendMail({
            from: mailData.from || process.env.SMTP_USER,
            to: mailData.to,
            subject: mailData.subject,
            html: mailData.htmlContent,
        });

        console.log('E-mail envoyé :', info.response);
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
        throw error;
    }
};
