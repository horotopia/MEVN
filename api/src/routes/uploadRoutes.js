import express from "express";
import multer from "multer";
import { authenticateToken } from "../middlewares/jwt.js";
const router = express.Router();

/**
 * @swagger
 * /api/upload:
 *  post:
 *      summary: Uploads a file.
 *      consumes:
 *        - multipart/form-data
 *      requestBody:
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                # 'file' will be the field name in this multipart request
 *                file:
 *                  type: string
 *                  format: binary
 *      responses:
 *          201:
 *              description: "File uploaded successfully"
 *              content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    token:
 *                      type: string
 *                      description: JWT token de l'utilisateur
 *          400:
 *              description: "Bad request"
 *          401:
 *              description: "Unauthorized"
 *          403:
 *              description: "Forbidden"
 *          404:
 *              description: "Not found"
 *          500:
 *              description: "Server error"
 */

// Configuration de multer pour stocker les fichiers uploadés
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

router.post("/upload", authenticateToken, upload.single("image"), async (req, res) => {
    if (!req.file) {
        return res.status(400).send("Aucun fichier sélectionné.");
    }

    res.status(200).send("Fichier uploadé avec succès.");
});

export default router;
