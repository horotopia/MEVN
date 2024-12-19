export const emailTemplates = {
    confirmation: (username: string, confirmationLink: string) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">Bienvenue, ${username} !</h1>
            <p>Merci de vous être inscrit. Cliquez sur le lien ci-dessous pour confirmer votre inscription :</p>
            <a href="${confirmationLink}" 
               style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
               Confirmer mon inscription
            </a>
        </div>
    `,

    passwordReset: (resetLink: string) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">Réinitialisation du mot de passe</h1>
            <p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
            <a href="${resetLink}" 
               style="display: inline-block; padding: 10px 20px; background-color: #2196F3; color: white; text-decoration: none; border-radius: 5px;">
               Réinitialiser mon mot de passe
            </a>
        </div>
    `,

    invoice: (username: string, invoiceLink: string) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">Bonjour, ${username}</h1>
            <p>Votre facture est disponible. Vous pouvez la consulter en cliquant sur le lien ci-dessous :</p>
            <a href="${invoiceLink}" 
               style="display: inline-block; padding: 10px 20px; background-color: #FF9800; color: white; text-decoration: none; border-radius: 5px;">
               Voir ma facture
            </a>
        </div>
    `
}; 