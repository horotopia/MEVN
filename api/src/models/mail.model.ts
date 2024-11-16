export interface MailData {
    to: string;
    subject: string;
    htmlContent: string;
    from?: string;
}

export class Mail {
    to: string;
    subject: string;
    htmlContent: string;
    from?: string;

    constructor({ to, subject, htmlContent, from }: MailData) {
        this.to = to;
        this.subject = subject;
        this.htmlContent = htmlContent;
        this.from = from;
    }

    validate(): boolean {
        if (!this.to || !this.subject || !this.htmlContent) {
            throw new Error('Les champs "to", "subject" et "htmlContent" sont obligatoires.');
        }

        if (!this.isValidEmail(this.to)) {
            throw new Error('L\'adresse e-mail "to" n\'est pas valide.');
        }

        return true;
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}
