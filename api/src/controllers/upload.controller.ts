import fs from 'fs';
import path from 'path';
import { NextFunction, Request, Response, Router } from "express";
import multer from 'multer';

export class UploadController {
    private tmpDir = path.join(__dirname, '../uploads/tmp');

    private storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, this.tmpDir);
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    });

    private upload = multer({ storage: this.storage, limits: { fileSize: 1000000 } });

    constructor() {
        if (!fs.existsSync(this.tmpDir)) {
            fs.mkdirSync(this.tmpDir, { recursive: true });
        }
    }

    public uploadFile = (req: Request, res: Response, next: NextFunction): void => {
        try {
            this.upload.single('image')(req, res, (err: any) => {
                if (err) {
                    console.error('Error uploading file:', err);
                    res.status(500).send('Error uploading file.');
                    return;
                }

                if (!req.file) {
                    res.status(400).send('No file uploaded.');
                    return;
                }

                if (!req.params.type || !req.params.id) {
                    res.status(400).send('Missing type or id parameter.');
                    return;
                }

                if (req.params.type === 'products' || req.params.type === 'users') {
                    if (!fs.existsSync(path.join(__dirname, '../uploads', req.params.type, req.params.id))) {
                        fs.mkdirSync(path.join(__dirname, '../uploads', req.params.type, req.params.id), { recursive: true });
                    }
                }

                const filePath = path.join(this.tmpDir, req.file.originalname);

                const newFileName = `${Date.now()}-${req.file.originalname.replace(/\s/g, '_')}`;

                fs.renameSync(filePath, path.join(__dirname, '../uploads', req.params.type, req.params.id, newFileName));

                res.status(200).json({
                    name: newFileName,
                    message: 'File uploaded successfully.'
                });

                return;
            });
        } catch (error) {
            if (!res.statusCode) {
                res.status(500);
            }
            next(error);
        }
    };

    public deleteFile = (req: Request, res: Response, next: NextFunction): void => {
        try {
            if (!req.params.filename || !req.params.type) {
                res.status(400);
                throw new Error('Missing filename or type parameter');
            }
            const filePath = path.join(__dirname, '../../uploads', req.params.filename);

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                    res.status(500).send('Error deleting file.');
                    return;
                }

                res.status(200).send('File deleted successfully.');
                return;
            });
        } catch (error) {
            if (!res.statusCode) {
                res.status(500);
            }
            next(error);
        }
    };

    buildRouter(): Router {
        const router = Router();

        router.get(
            "/:type/:id",
            (req: Request, res: Response) => {
                const filename = "Capture-2024-12-29-020605.png";
                const type = "products";
                const id = "60f4b6e1e9f0f4001b111111";

                const filePath = path.join(__dirname, '../uploads/tmp', filename);

                if (!fs.existsSync(path.join(__dirname, '../uploads', type, id))) {
                    fs.mkdirSync(path.join(__dirname, '../uploads', type, id), { recursive: true });
                }

                fs.renameSync(filePath, path.join(__dirname, '../uploads', type, id, filename));

                res.json(
                    {
                        type: req.params.type,
                        id: req.params.id
                    }
                );
            }
        )

        router.post(
            "/:type/:id",
            this.uploadFile
        );
        router.delete(
            "/:type/:filename",
            this.deleteFile
        );
        return router;
    }
}
