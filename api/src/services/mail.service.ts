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
