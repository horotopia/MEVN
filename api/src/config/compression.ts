import compression from "compression";
import { Application, Request, Response } from "express";
import logger from './logger';

const configureCompression = (app: Application) => {
    const compressionOptions = {
        // Compress all HTTP responses
        filter: (req: Request, res: Response) => {
            if (req.headers["x-no-compression"]) {
                return false;
            }
            return compression.filter(req, res);
        },
        threshold: 0,
    };

    app.use(compression(compressionOptions));

    logger.info('Compression has been enabled');
};

export default configureCompression;
