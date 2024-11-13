import transporter from "../config/transporter";

export const sendMail = async (to: string, subject: string, htmlContent: string) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject,
            html: htmlContent
        });
        console.log('Email envoyé :', info.response);
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email :', error);
    }
};