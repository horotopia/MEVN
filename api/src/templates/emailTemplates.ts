export const emailTemplates = {
    confirmation: (username: string, confirmationLink: string) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: white; padding: 32px; border-radius: 12px; border: 2px solid #DDDDDD; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
            <h1 style="font-size: 32px; font-weight: 800; text-align: center; margin-bottom: 32px; font-family: var(--font-primary); color: #333;">POKÉSHOP</h1>
            
            <h2 style="font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 24px; color: #333;">Bienvenue, ${username} !</h2>
            
            <p style="color: #4B5563; margin-bottom: 24px; font-family: var(--font-secondary); font-weight: 600;">Pour activer votre compte, veuillez cliquer sur le bouton ci-dessous :</p>
            
            <div style="text-align: center;">
                <a href="${confirmationLink}" 
                   style="display: inline-block; background-color: #C73D3D; color: white; padding: 8px 32px; border-radius: 9999px; text-decoration: none; font-weight: bold; font-family: var(--font-primary); font-size: 18px;">
                   CONFIRMER MON COMPTE
                </a>
            </div>
            
            <p style="color: #6B7280; margin-top: 24px; font-size: 14px; text-align: center;">Ce lien est valable pendant 24 heures.</p>
        </div>
    `,

    passwordReset: (resetLink: string) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: white; padding: 32px; border-radius: 12px; border: 2px solid #DDDDDD; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
            <h1 style="font-size: 32px; font-weight: 800; text-align: center; margin-bottom: 32px; font-family: var(--font-primary); color: #333;">POKÉSHOP</h1>
            
            <h2 style="font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 24px; color: #333;">Réinitialisation du mot de passe</h2>
            
            <p style="color: #4B5563; margin-bottom: 24px; font-family: var(--font-secondary); font-weight: 600;">Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le bouton ci-dessous :</p>
            
            <div style="text-align: center;">
                <a href="${resetLink}" 
                   style="display: inline-block; background-color: #C73D3D; color: white; padding: 8px 32px; border-radius: 9999px; text-decoration: none; font-weight: bold; font-family: var(--font-primary); font-size: 18px;">
                   RÉINITIALISER MON MOT DE PASSE
                </a>
            </div>
            
            <p style="color: #6B7280; margin-top: 24px; font-size: 14px; text-align: center;">Ce lien est valable pendant 1 heure.</p>
        </div>
    `,

    invoice: (username: string, invoiceLink: string) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: white; padding: 32px; border-radius: 12px; border: 2px solid #DDDDDD; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
            <h1 style="font-size: 32px; font-weight: 800; text-align: center; margin-bottom: 32px; font-family: var(--font-primary); color: #333;">POKÉSHOP</h1>
            
            <h2 style="font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 24px; color: #333;">Merci pour votre commande, ${username} !</h2>
            
            <p style="color: #4B5563; margin-bottom: 24px; font-family: var(--font-secondary); font-weight: 600;">Votre facture est maintenant disponible. Vous pouvez la consulter en cliquant sur le bouton ci-dessous :</p>
            
            <div style="text-align: center;">
                <a href="${invoiceLink}" 
                   style="display: inline-block; background-color: #C73D3D; color: white; padding: 8px 32px; border-radius: 9999px; text-decoration: none; font-weight: bold; font-family: var(--font-primary); font-size: 18px;">
                   VOIR MA FACTURE
                </a>
            </div>
        </div>
    `,

    orderConfirmation: (username: string, orderNumber: string, orderDetails: string) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: white; padding: 32px; border-radius: 12px; border: 2px solid #DDDDDD; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
            <h1 style="font-size: 32px; font-weight: 800; text-align: center; margin-bottom: 32px; font-family: var(--font-primary); color: #333;">POKÉSHOP</h1>
            
            <h2 style="font-size: 24px; font-weight: bold; text-align: center; margin-bottom: 24px; color: #333;">Confirmation de commande</h2>
            
            <p style="color: #4B5563; margin-bottom: 16px; font-family: var(--font-secondary); font-weight: 600;">Cher(e) ${username},</p>
            
            <p style="color: #4B5563; margin-bottom: 24px; font-family: var(--font-secondary); font-weight: 600;">Nous vous confirmons que votre commande n°${orderNumber} a bien été enregistrée.</p>
            
            <div style="background-color: #F3F4F6; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
                <h3 style="color: #333; font-size: 18px; margin-bottom: 16px;">Récapitulatif de votre commande :</h3>
                ${orderDetails}
            </div>
            
            <p style="color: #4B5563; font-family: var(--font-secondary); font-weight: 600; text-align: center;">Vous recevrez prochainement un email contenant votre facture.</p>
            
            <div style="text-align: center; margin-top: 32px;">
                <p style="color: #6B7280; font-size: 14px;">L'équipe POKÉSHOP vous remercie pour votre confiance !</p>
            </div>
        </div>
    `
};