import express from "express";
import multer from "multer";
import path from "node:path";
import { authenticateToken } from "../middlewares/jwt";

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
 *                image:
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

// region multer configuration
// Configuration de multer pour stocker les fichiers uploadés
const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, path.resolve() + '/src/uploads/');
    },
    filename: (req: any, file: any, cb: any) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

router.post("/", authenticateToken, upload.single("image"), async (req: any, res: any) => {
    if (!req.file) {
        return res.status(400).send("Aucun fichier sélectionné.");
    }
    res.status(200).send("Fichier uploadé avec succès.");
});
// endregion

export default router;
