import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'mailhog',
    port: 1025,
    secure: false,
    ignoreTLS: true
});

export default transporter;