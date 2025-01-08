import { AuthController } from '../../controllers/auth.controller';
import { Request, Response, NextFunction } from 'express';
import { findUser, createUser, updateUser, findUserByVerificationToken, findUserByResetToken } from '../../models/user.interface';
import { mailService } from '../../services/mail.service';
import { Bcrypt, generateResetToken } from '../../utils';

jest.mock('../../models/user.interface');
jest.mock('../../services/mail.service');
jest.mock('../../utils');

describe('AuthController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;
    let authController: AuthController;

    beforeEach(() => {
        req = {
            body: {},
            query: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
        authController = new AuthController();
    });

    describe('register', () => {
        it('should register a new user and send a confirmation email', async () => {
            req.body = {
                name: 'John Doe',
                email: 'johndoe@example.com',
                tel: '0102030405',
                password: 'myPassword123'
            };

            (createUser as jest.Mock).mockResolvedValue(req.body);
            (generateResetToken as jest.Mock).mockReturnValue('token');
            (mailService.sendTemplatedEmail as jest.Mock).mockResolvedValue(true);

            await authController.register(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                response: true,
                message: "Un email de confirmation vous a été envoyé"
            });
        });

        it('should handle errors', async () => {
            req.body = {
                name: 'John Doe',
                email: 'johndoe@example.com',
                tel: '0102030405',
                password: 'myPassword123'
            };

            (createUser as jest.Mock).mockRejectedValue(new Error('Error'));

            await authController.register(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(new Error('Error'));
        });
    });

    describe('login', () => {
        it('should login a user', async () => {
            req.body = {
                email: 'johndoe@example.com',
                password: 'myPassword123'
            };

            const user = {
                _id: '1',
                email: 'johndoe@example.com',
                password: 'hashedPassword',
                isEmailVerified: true
            };

            (findUser as jest.Mock).mockResolvedValue(user);
            (Bcrypt.prototype.comparePassword as jest.Mock).mockResolvedValue(true);

            await authController.login(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                user: expect.objectContaining({
                    email: 'johndoe@example.com'
                }),
                jwtToken: expect.any(String)
            }));
        });

        it('should handle invalid credentials', async () => {
            req.body = {
                email: 'johndoe@example.com',
                password: 'wrongPassword'
            };

            (findUser as jest.Mock).mockResolvedValue(null);

            await authController.login(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({
                message: "Invalid credentials"
            });
        });
    });

    describe('verifyEmail', () => {
        it('should verify user email', async () => {
            req.query = { token: 'token' };

            const user = {
                _id: '1',
                emailVerificationToken: 'token',
                emailVerificationTokenExpires: new Date(Date.now() + 3600000)
            };

            (findUserByVerificationToken as jest.Mock).mockResolvedValue(user);
            (updateUser as jest.Mock).mockResolvedValue(true);

            await authController.verifyEmail(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Email vérifié avec succès" });
        });

        it('should handle invalid token', async () => {
            req.query = { token: 'invalidToken' };

            (findUserByVerificationToken as jest.Mock).mockResolvedValue(null);

            await authController.verifyEmail(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(next).toHaveBeenCalledWith(new Error("Token invalide"));
        });
    });

    describe('forgotPassword', () => {
        it('should send password reset email', async () => {
            req.body = { email: 'johndoe@example.com' };

            const user = {
                _id: '1',
                email: 'johndoe@example.com'
            };

            (findUser as jest.Mock).mockResolvedValue(user);
            (generateResetToken as jest.Mock).mockReturnValue('resetToken');
            (updateUser as jest.Mock).mockResolvedValue(true);
            (mailService.sendTemplatedEmail as jest.Mock).mockResolvedValue(true);

            await authController.forgotPassword(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Email de réinitialisation envoyé avec succès.' });
        });

        it('should handle user not found', async () => {
            req.body = { email: 'johndoe@example.com' };

            (findUser as jest.Mock).mockResolvedValue(null);

            await authController.forgotPassword(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Aucun compte n'est associé à cette adresse email." });
        });
    });

    describe('resetPassword', () => {
        it('should reset user password', async () => {
            req.body = {
                token: 'resetToken',
                password: 'newPassword'
            };

            const user = {
                _id: '1',
                resetPasswordToken: 'resetToken',
                resetPasswordExpires: new Date(Date.now() + 3600000)
            };

            (findUserByResetToken as jest.Mock).mockResolvedValue(user);
            (Bcrypt.prototype.hashPassword as jest.Mock).mockResolvedValue('hashedPassword');
            (updateUser as jest.Mock).mockResolvedValue(true);

            await authController.resetPassword(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Mot de passe réinitialisé avec succès.' });
        });

        it('should handle invalid or expired token', async () => {
            req.body = {
                token: 'invalidToken',
                password: 'newPassword'
            };

            (findUserByResetToken as jest.Mock).mockResolvedValue(null);

            await authController.resetPassword(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Le lien de réinitialisation est invalide ou a expiré.' });
        });
    });
});
