## [Table des matières](../README.md)

## Dépendances

### 1. Dépendances de sécurité :

- `bcrypt` : pour le hachage des mots de passe.
- `csurf` : protection contre les attaques CSRF (Cross-Site Request Forgery).
- `helmet` : renforce la sécurité des en-têtes HTTP.
- `jsonwebtoken` : génération et validation des tokens JWT pour l'authentification.

### 2. Dépendances de gestion des requêtes et réponses :

- `body-parser` : pour parser les corps des requêtes HTTP.
- `cookie-parser` : pour parser les cookies dans les requêtes HTTP.
- `cors` : pour gérer les permissions Cross-Origin Resource Sharing.
- `express` : framework web pour la gestion des requêtes HTTP.
- `express-validator` : pour la validation des données dans les requêtes HTTP.
- `multer` : pour le traitement des fichiers multipart/form-data (upload de fichiers).

### 3. Dépendances de configuration :

- `dotenv` : pour charger les variables d'environnement à partir d'un fichier `.env`.

### 4. Dépendances de base de données :

- `mongoose` : ODM (Object Data Modeling) pour MongoDB.

### 5. Dépendances de services externes :

- `nodemailer` : pour l'envoi d'e-mails.
- `paypal-rest-sdk` : SDK pour intégrer PayPal.
- `stripe` : pour intégrer le paiement Stripe.

### 6. Dépendances de documentation :

- `swagger-jsdoc` : pour générer la documentation Swagger à partir des annotations JSDoc.
- `swagger-ui-express` : pour intégrer Swagger UI dans Express.

### 7. Dépendances de logging et debugging :

- `winston` : pour le logging avancé.
  - Récapitulatif des niveaux et de leur utilisation :
  - error : Pour capturer des erreurs critiques ou des exceptions.
  - warn : Pour signaler des problèmes potentiels ou des comportements anormaux.
  - info : Pour consigner des événements normaux ou des informations générales.
  - http : Pour enregistrer les requêtes HTTP et leur statut.
  - debug : Pour capturer des informations très détaillées, surtout lors du développement.

### 8. Dépendances de développement :

- `eslint` : pour l'analyse de code et l'application des normes de style.
- `nodemon` : pour recharger automatiquement l'application lors de modifications de code en développement.
- `prettier` : pour le formatage automatique du code.
