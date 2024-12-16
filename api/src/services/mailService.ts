import transporter from '../config/transporter';
import { Mail } from '../models/mail.model';
import { emailTemplates } from '../templates/emailTemplates';

interface EmailOptions {
    to: string;
    subject: string;
    template: keyof typeof emailTemplates;
    data: Record<string, string>;
}

export class MailService {
    private static instance: MailService;
    private readonly defaultFrom: string;

    private constructor() {
        this.defaultFrom = process.env.SMTP_USER || 'noreply@votreapp.com';
    }

    public static getInstance(): MailService {
        if (!MailService.instance) {
            MailService.instance = new MailService();
        }
        return MailService.instance;
    }

    async sendMail(mailData: Mail): Promise<void> {
        try {
            mailData.validate();

            const info = await transporter.sendMail({
                from: mailData.from || this.defaultFrom,
                to: mailData.to,
                subject: mailData.subject,
                html: mailData.htmlContent,
            });

            console.log('E-mail envoyé :', info.messageId);
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
            throw error;
        }
    }

    async sendTemplatedEmail({ to, subject, template, data }: EmailOptions): Promise<void> {
        const htmlContent = emailTemplates[template](data.username, data.link);
        
        const mail = new Mail({
            to,
            subject,
            htmlContent,
            from: this.defaultFrom
        });

        await this.sendMail(mail);
    }
}

export const mailService = MailService.getInstance();
