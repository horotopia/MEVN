import mongoose from 'mongoose';
import request from 'supertest';
import express, { Express, Router } from 'express';
import { OrdersController } from '../../controllers/orders.controller';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../../middlewares/jwt';
import { validateRoleAdmin, validateRoleUser, validateRoleAdminOrUser } from '../../middlewares/validator/validateRole';
import { validateObjectId } from '../../middlewares/validate';

jest.mock('../../services/mongoose/mongoose.service', () => ({
    MongooseService: {
        get: () => Promise.resolve({
            ordersService: {
                findAllOrders: () => Promise.resolve([
                    {
                        _id: 'testOrderId',
                        userId: 'testUserId',
                        items: [
                            {
                                productId: 'testProductId',
                                quantity: 2,
                                price: 25000
                            }
                        ],
                        totalAmount: 50000,
                        status: 'pending'
                    }
                ]),
                findOrdersById: (id: string) => {
                    if (id === 'testOrderId') {
                        return Promise.resolve({
                            _id: 'testOrderId',
                            userId: 'testUserId',
                            items: [
                                {
                                    productId: 'testProductId',
                                    quantity: 2,
                                    price: 25000
                                }
                            ],
                            totalAmount: 50000,
                            status: 'pending'
                        });
                    }
                    return Promise.resolve(null);
                },
                findAllOrdersByUserId: (userId: string) => {
                    if (userId === 'testUserId') {
                        return Promise.resolve([
                            {
                                _id: 'testOrderId',
                                userId: 'testUserId',
                                items: [
                                    {
                                        productId: 'testProductId',
                                        quantity: 2,
                                        price: 25000
                                    }
                                ],
                                totalAmount: 50000,
                                status: 'pending'
                            }
                        ]);
                    }
                    return Promise.resolve([]);
                },
                findAllOrdersByStatus: (status: string) => {
                    if (status === 'pending') {
                        return Promise.resolve([
                            {
                                _id: 'testOrderId',
                                userId: 'testUserId',
                                items: [
                                    {
                                        productId: 'testProductId',
                                        quantity: 2,
                                        price: 25000
                                    }
                                ],
                                totalAmount: 50000,
                                status: 'pending'
                            }
                        ]);
                    }
                    return Promise.resolve([]);
                },
                createOrder: (data: any) => Promise.resolve({
                    _id: 'testOrderId',
                    ...data
                }),
                updateOrder: (id: string, data: any) => {
                    if (id === 'testOrderId') {
                        return Promise.resolve({
                            _id: 'testOrderId',
                            ...data
                        });
                    }
                    return Promise.resolve(null);
                },
                deleteOrder: (id: string) => {
                    if (id === 'testOrderId') {
                        return Promise.resolve({ _id: id });
                    }
                    return Promise.resolve(null);
                },
                anonymise: (userId: string) => Promise.resolve(),
                calculateAverageOrderAmount: () => Promise.resolve({
                    currentMonthOrder: 55000,
                    lastMonthOrder: 45000,
                    growthRateOrder: 22.22
                }),
                totalAmountOrdersByMonth: (year: number) => Promise.resolve([
                    50000, 55000, 60000, 65000, 70000, 75000,
                    80000, 85000, 90000, 95000, 100000, 105000
                ])
            }
        })
    }
}));


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


jest.mock('../../middlewares/validator/validateRole', () => ({
    validateRoleAdmin: (req: any, res: any, next: any) => {
        if (req.user?.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden' });
        }
    },
    validateRoleUser: (req: any, res: any, next: any) => {
        if (req.user?.role === 'user') {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden' });
        }
    },
    validateRoleAdminOrUser: (req: any, res: any, next: any) => {
        if (req.user?.role === 'admin' || req.user?.role === 'user') {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden' });
        }
    }
}));


jest.mock('../../middlewares/validate', () => ({
    validateObjectId: (req: any, res: any, next: any) => {
        if (req.params.id === 'testOrderId' ||
            req.params.userId === 'testUserId' ||
            mongoose.Types.ObjectId.isValid(req.params.id) ||
            mongoose.Types.ObjectId.isValid(req.params.userId)) {
            next();
        } else {
            res.status(400).json({ message: 'Invalid ObjectId' });
        }
    }
}));

describe('Bon bah on va tester les routes des commandes', () => {
    let app: Express;
    let adminToken: string;
    let userToken: string;
    const testOrderId = 'testOrderId';
    const testUserId = 'testUserId';

    beforeAll(async () => {

        app = express();
        app.use(express.json());

        const ordersController = new OrdersController();
        app.use('/api/orders', ordersController.buildRouter());

        app.use((err: any, req: any, res: any, next: any) => {
            // console.error('Error:', err);
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

    describe('POST /api/orders', () => {
        test('devrait permettre à un user de créer une commande', async () => {
            const newOrder = {
                userId: testUserId,
                items: [
                    {
                        productId: 'testProductId',
                        quantity: 2,
                        price: 25000
                    }
                ],
                totalAmount: 50000
            };

            const response = await request(app)
                .post('/api/orders')
                .set('Authorization', `Bearer ${userToken}`)
                .send(newOrder);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('userId', testUserId);
        });

        test('devrait empêcher un admin de créer une commande', async () => {
            const response = await request(app)
                .post('/api/orders')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({});

            expect(response.status).toBe(403);
        });

        test('devrait retourner 400 si des champs requis sont manquants', async () => {
            const response = await request(app)
                .post('/api/orders')
                .set('Authorization', `Bearer ${userToken}`)
                .send({
                    userId: testUserId
                });

            expect(response.status).toBe(400);
        });
    });

    describe('GET /api/orders/:id', () => {
        test('devrait permettre à un user de voir une commande', async () => {
            const response = await request(app)
                .get(`/api/orders/${testOrderId}`)
                .set('Authorization', `Bearer ${userToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('_id', testOrderId);
        });

        test('devrait retourner 404 pour un ID inexistant', async () => {
            const fakeId = new mongoose.Types.ObjectId().toString();
            const response = await request(app)
                .get(`/api/orders/${fakeId}`)
                .set('Authorization', `Bearer ${userToken}`);

            expect(response.status).toBe(404);
        });
    });

    describe('GET /api/orders/u/:userId', () => {
        test('devrait permettre à un user de voir ses commandes', async () => {
            const response = await request(app)
                .get(`/api/orders/u/${testUserId}`)
                .set('Authorization', `Bearer ${userToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body[0]).toHaveProperty('userId', testUserId);
        });
    });

    describe('GET /api/orders/s/:status', () => {
        test('devrait permettre à un admin de voir les commandes par status', async () => {
            const response = await request(app)
                .get('/api/orders/s/pending')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body[0]).toHaveProperty('status', 'pending');
        });

        test('devrait empêcher un user normal de voir les commandes par status', async () => {
            const response = await request(app)
                .get('/api/orders/s/pending')
                .set('Authorization', `Bearer ${userToken}`);

            expect(response.status).toBe(403);
        });
    });

    describe('GET /api/orders', () => {
        test('devrait permettre à un admin de voir toutes les commandes', async () => {
            const response = await request(app)
                .get('/api/orders')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        test('devrait empêcher un user normal de voir toutes les commandes', async () => {
            const response = await request(app)
                .get('/api/orders')
                .set('Authorization', `Bearer ${userToken}`);

            expect(response.status).toBe(403);
        });
    });

    describe('PUT /api/orders/:id', () => {
        test('devrait permettre à un admin de modifier une commande', async () => {
            const response = await request(app)
                .put(`/api/orders/${testOrderId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    status: 'completed'
                });

            expect(response.status).toBe(204);
        });

        test('devrait empêcher un user normal de modifier une commande', async () => {
            const response = await request(app)
                .put(`/api/orders/${testOrderId}`)
                .set('Authorization', `Bearer ${userToken}`)
                .send({
                    status: 'completed'
                });

            expect(response.status).toBe(403);
        });
    });

    describe('DELETE /api/orders/:id', () => {
        test('devrait permettre à un admin de supprimer une commande', async () => {
            const response = await request(app)
                .delete(`/api/orders/${testOrderId}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(204);
        });

        test('devrait empêcher un user normal de supprimer une commande', async () => {
            const response = await request(app)
                .delete(`/api/orders/${testOrderId}`)
                .set('Authorization', `Bearer ${userToken}`);

            expect(response.status).toBe(403);
        });
    });

    describe('DELETE /api/orders/u/:userId', () => {
        test('devrait permettre à un admin d\'anonymiser les commandes d\'un utilisateur', async () => {
            const response = await request(app)
                .delete(`/api/orders/u/${testUserId}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(204);
        });

        test('devrait permettre à un user d\'anonymiser ses propres commandes', async () => {
            const response = await request(app)
                .delete(`/api/orders/u/${testUserId}`)
                .set('Authorization', `Bearer ${userToken}`);

            expect(response.status).toBe(204);
        });
    });

    describe('GET /api/orders/calculateAverageOrderAmount', () => {
        test('devrait permettre à un admin de voir les statistiques moyennes', async () => {
            const response = await request(app)
                .get('/api/orders/calculateAverageOrderAmount')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('currentMonthOrder');
            expect(response.body).toHaveProperty('lastMonthOrder');
            expect(response.body).toHaveProperty('growthRateOrder');
        });

        test('devrait empêcher un user normal de voir les statistiques moyennes', async () => {
            const response = await request(app)
                .get('/api/orders/calculateAverageOrderAmount')
                .set('Authorization', `Bearer ${userToken}`);

            expect(response.status).toBe(403);
        });
    });

    describe('GET /api/orders/totalAmountByMonth/:year', () => {
        test('devrait permettre à un admin de voir les totaux mensuels', async () => {
            const response = await request(app)
                .get('/api/orders/totalAmountByMonth/2024')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body).toHaveLength(12);
        });

        test('devrait empêcher un user normal de voir les totaux mensuels', async () => {
            const response = await request(app)
                .get('/api/orders/totalAmountByMonth/2024')
                .set('Authorization', `Bearer ${userToken}`);

            expect(response.status).toBe(403);
        });
    });
}); 