import mongoose, { Schema } from 'mongoose';
import request from 'supertest';
import express, { Express, Router } from 'express';
import { UserController } from '../../controllers/user.controller';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../../middlewares/jwt';
import { validateRoleAdmin, validateRoleAdminOrUserId } from '../../middlewares/validator/validateRole';
import { validateObjectId } from '../../middlewares/validate';

// On mock le MongooseService
jest.mock('../../services/mongoose/mongoose.service', () => ({
    MongooseService: {
        get: () => Promise.resolve({
            userService: {
                findAllUsers: () => Promise.resolve([
                    {
                        _id: 'testUserId',
                        name: 'Test User',
                        email: 'test@pokemon.fr',
                        role: 'user'
                    }
                ]),
                findUserById: (id: string) => {
                    if (id === 'testUserId') {
                        return Promise.resolve({
                            _id: 'testUserId',
                            name: 'Robert',
                            email: 'robert@pokemon.fr',
                            role: 'user'
                        });
                    }
                    return Promise.resolve(null);
                },
                updateUser: (id: string, data: any) => {
                    if (id === 'testUserId') {
                        return Promise.resolve({
                            _id: 'testUserId',
                            ...data,
                            role: 'user'
                        });
                    }
                    return Promise.resolve(null);
                },
                deleteUser: (id: string) => {
                    if (id === 'testUserId') {
                        return Promise.resolve({ _id: id });
                    }
                    return Promise.resolve(null);
                },
                countUsersByMonth: () => Promise.resolve({
                    currentMonthUser: 250,
                    lastMonthUser: 200,
                    growthRateUser: 25.0
                })
            }
        })
    }
}));

// On mock le middleware d'authentification
jest.mock('../../middlewares/jwt', () => ({
    authenticateToken: (req: any, res: any, next: any) => {
        if (!req.headers.authorization) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
    }
}));

// On mock les middlewares de validation des rôles
jest.mock('../../middlewares/validator/validateRole', () => ({
    validateRoleAdmin: (req: any, res: any, next: any) => {
        if (req.user?.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden' });
        }
    },
    validateRoleAdminOrUserId: (req: any, res: any, next: any) => {
        if (req.user?.role === 'admin' || req.user?.userId === req.params.id) {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden' });
        }
    },
    validateUserId: (req: any, res: any, next: any) => {
        if (req.user?.role === 'admin' || req.user?.userId === req.params.id) {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden' });
        }
    }
}));


jest.mock('../../middlewares/validate', () => ({
    validateObjectId: (req: any, res: any, next: any) => {
        if (req.params.id === 'testUserId' || mongoose.Types.ObjectId.isValid(req.params.id)) {
            next();
        } else {
            res.status(400).json({ message: 'Invalid ObjectId' });
        }
    }
}));

describe('Bon bah on va tester les routes des users', () => {
    let app: Express;
    let adminToken: string;
    let userToken: string;
    const testUserId = 'testUserId';

    beforeAll(async () => {

        app = express();
        app.use(express.json());

        const userController = new UserController();
        const router = Router();


        router.get(
            '/countUsersByMonth',
            authenticateToken,
            validateRoleAdmin,
            userController.countUsersByMonth.bind(userController)
        );

        router.get(
            '/',
            authenticateToken,
            validateRoleAdmin,
            userController.getUsers.bind(userController)
        );

        router.get(
            '/:id',
            authenticateToken,
            validateRoleAdminOrUserId,
            validateObjectId,
            userController.getOneUser.bind(userController)
        );

        router.put(
            '/:id',
            authenticateToken,
            validateRoleAdminOrUserId,
            validateObjectId,
            userController.updateUser.bind(userController)
        );

        router.delete(
            '/:id',
            authenticateToken,
            validateRoleAdminOrUserId,
            validateObjectId,
            userController.deleteUser.bind(userController)
        );

        app.use('/api/users', router);


        app.use((err: any, req: any, res: any, next: any) => {
            console.error('Error:', err);
            res.status(res.statusCode || 500).json({ message: err.message });
        });


        adminToken = jwt.sign(
            { userId: 'adminId', role: 'admin' },
            process.env.JWT_SECRET || 'secret'
        );


        userToken = jwt.sign(
            { userId: 'userId', role: 'user' },
            process.env.JWT_SECRET || 'secret'
        );
    });

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('GET /api/users', () => {
        test('devrait retourner tous les users pour un admin', async () => {
            const response = await request(app)
                .get('/api/users')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        test('devrait refuser l\'accès pour un user normal', async () => {
            const response = await request(app)
                .get('/api/users')
                .set('Authorization', `Bearer ${userToken}`);

            expect(response.status).toBe(403);
        });
    });

    describe('GET /api/users/:id', () => {
        test('devrait retourner un user par son ID', async () => {
            const response = await request(app)
                .get(`/api/users/${testUserId}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('email', 'robert@pokemon.fr');
        });

        test('devrait retourner 404 pour un ID inexistant', async () => {
            const fakeId = new mongoose.Types.ObjectId().toString();
            const response = await request(app)
                .get(`/api/users/${fakeId}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(404);
        });
    });

    describe('PUT /api/users/:id', () => {
        test('devrait permettre à un admin de modifier un user', async () => {
            const response = await request(app)
                .put(`/api/users/${testUserId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    name: 'Robert Modifié',
                    email: 'robert.modifie@pokemon.fr'
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('name', 'Robert Modifié');
        });

        test('devrait empêcher un user de modifier un autre user', async () => {
            const response = await request(app)
                .put(`/api/users/${testUserId}`)
                .set('Authorization', `Bearer ${userToken}`)
                .send({
                    name: 'Tentative de hack'
                });

            expect(response.status).toBe(403);
        });
    });

    describe('DELETE /api/users/:id', () => {
        test('devrait permettre à un admin de supprimer un user', async () => {
            const response = await request(app)
                .delete(`/api/users/${testUserId}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
        });

        test('devrait empêcher un user de supprimer un autre user', async () => {
            const response = await request(app)
                .delete(`/api/users/${testUserId}`)
                .set('Authorization', `Bearer ${userToken}`);

            expect(response.status).toBe(403);
        });
    });

    describe('GET /api/users/countUsersByMonth', () => {
        test('devrait permettre à un admin de voir les stats', async () => {
            const response = await request(app)
                .get('/api/users/countUsersByMonth')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('currentMonthUser');
            expect(response.body).toHaveProperty('lastMonthUser');
            expect(response.body).toHaveProperty('growthRateUser');
        });

        test('devrait empêcher un user normal de voir les stats', async () => {
            const response = await request(app)
                .get('/api/users/countUsersByMonth')
                .set('Authorization', `Bearer ${userToken}`);

            expect(response.status).toBe(403);
        });
    });
}); 