import mongoose from 'mongoose';
import request from 'supertest';
import express, { Express, Router } from 'express';
import { ProductController } from '../../controllers/product.controller';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../../middlewares/jwt';
import { validateRoleAdmin } from '../../middlewares/validator/validateRole';
import { validateObjectId, validateAttributeAndValue } from '../../middlewares/validate';


jest.mock('../../services/mongoose/mongoose.service', () => ({
    MongooseService: {
        get: () => Promise.resolve({
            productService: {
                findAllProducts: () => Promise.resolve([
                    {
                        _id: 'testProductId',
                        name: 'Pikachu',
                        description: 'Pokémon électrique',
                        habitat: 'Forêt',
                        habitude: 'Joueur',
                        type: 'électrique',
                        evolutionLevel: 2,
                        evolutionReference: 'Pichu',
                        weight: 6000,
                        height: 40,
                        age: 4,
                        price: 50000,
                        category: 'pokémon',
                        stock: 5
                    }
                ]),
                findProductById: (id: string) => {
                    if (id === 'testProductId') {
                        return Promise.resolve({
                            _id: 'testProductId',
                            name: 'Pikachu',
                            description: 'Pokémon électrique',
                            habitat: 'Forêt',
                            habitude: 'Joueur',
                            type: 'électrique',
                            evolutionLevel: 2,
                            evolutionReference: 'Pichu',
                            weight: 6000,
                            height: 40,
                            age: 4,
                            price: 50000,
                            category: 'pokémon',
                            stock: 5
                        });
                    }
                    return Promise.resolve(null);
                },
                findProductsByAttribute: (attribute: string, value: string) => {
                    if (attribute === 'type' && value === 'électrique') {
                        return Promise.resolve([{
                            _id: 'testProductId',
                            name: 'Pikachu',
                            type: 'électrique'
                        }]);
                    }
                    return Promise.resolve([]);
                },
                createProduct: (data: any) => Promise.resolve({
                    _id: 'testProductId',
                    ...data
                }),
                updateProduct: (id: string, data: any) => {
                    if (id === 'testProductId') {
                        return Promise.resolve({
                            _id: 'testProductId',
                            ...data
                        });
                    }
                    return Promise.resolve(null);
                },
                deleteProduct: (id: string) => {
                    if (id === 'testProductId') {
                        return Promise.resolve({ _id: id });
                    }
                    return Promise.resolve(null);
                },
                countProductSellInMonth: () => Promise.resolve({
                    currentMonthSell: 150,
                    lastMonthSell: 100,
                    growthRateSell: 50.0
                })
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
    }
}));

jest.mock('../../middlewares/validate', () => ({
    validateObjectId: (req: any, res: any, next: any) => {
        if (req.params.id === 'testProductId' || mongoose.Types.ObjectId.isValid(req.params.id)) {
            next();
        } else {
            res.status(400).json({ message: 'Invalid ObjectId' });
        }
    },
    validateAttributeAndValue: (req: any, res: any, next: any) => {
        const validAttributes = ['type', 'category', 'name'];
        if (validAttributes.includes(req.params.attribute)) {
            next();
        } else {
            res.status(400).json({ message: 'Invalid attribute' });
        }
    }
}));

describe('Bon bah on va tester les routes des produits', () => {
    let app: Express;
    let adminToken: string;
    let userToken: string;
    const testProductId = 'testProductId';

    beforeAll(async () => {

        app = express();
        app.use(express.json());

        const productController = new ProductController();
        const router = Router();


        router.get(
            '/countProductSellInMonth',
            authenticateToken,
            validateRoleAdmin,
            productController.countProductSellInMonth.bind(productController)
        );

        router.get(
            '/:id',
            validateObjectId,
            productController.getOneProduct.bind(productController)
        );

        router.get(
            '/:attribute/:value',
            validateAttributeAndValue,
            productController.getProductByAttribute.bind(productController)
        );

        router.get(
            '/',
            productController.getProducts.bind(productController)
        );

        router.post(
            '/',
            authenticateToken,
            validateRoleAdmin,
            productController.createProduct.bind(productController)
        );

        router.put(
            '/:id',
            authenticateToken,
            validateRoleAdmin,
            validateObjectId,
            productController.updateProduct.bind(productController)
        );

        router.delete(
            '/:id',
            authenticateToken,
            validateRoleAdmin,
            validateObjectId,
            productController.deleteProduct.bind(productController)
        );

        app.use('/api/product', router);


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

    describe('GET /api/product', () => {
        test('devrait retourner tous les produits', async () => {
            const response = await request(app)
                .get('/api/product');

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body[0]).toHaveProperty('name', 'Pikachu');
        });
    });

    describe('GET /api/product/:id', () => {
        test('devrait retourner un produit par son ID', async () => {
            const response = await request(app)
                .get(`/api/product/${testProductId}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('name', 'Pikachu');
        });

        test('devrait retourner 404 pour un ID inexistant', async () => {
            const fakeId = new mongoose.Types.ObjectId().toString();
            const response = await request(app)
                .get(`/api/product/${fakeId}`);

            expect(response.status).toBe(404);
        });
    });

    describe('GET /api/product/:attribute/:value', () => {
        test('devrait retourner les produits par attribut', async () => {
            const response = await request(app)
                .get('/api/product/type/électrique');

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body[0]).toHaveProperty('type', 'électrique');
        });

        test('devrait retourner 400 pour un attribut invalide', async () => {
            const response = await request(app)
                .get('/api/product/invalid/value');

            expect(response.status).toBe(400);
        });
    });

    describe('POST /api/product', () => {
        test('devrait permettre à un admin de créer un produit', async () => {
            const newProduct = {
                name: 'Pikachu',
                description: 'Pokémon électrique',
                habitat: 'Forêt',
                habitude: 'Joueur',
                type: 'électrique',
                evolutionLevel: 2,
                evolutionReference: 'Pichu',
                weight: 6000,
                height: 40,
                age: 4,
                price: 50000,
                category: 'pokémon',
                stock: 5
            };

            const response = await request(app)
                .post('/api/product')
                .set('Authorization', `Bearer ${adminToken}`)
                .send(newProduct);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('name', 'Pikachu');
        });

        test('devrait empêcher un user normal de créer un produit', async () => {
            const response = await request(app)
                .post('/api/product')
                .set('Authorization', `Bearer ${userToken}`)
                .send({});

            expect(response.status).toBe(403);
        });

        test('devrait retourner 400 si des champs requis sont manquants', async () => {
            const response = await request(app)
                .post('/api/product')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    name: 'Pikachu'
                });

            expect(response.status).toBe(400);
        });
    });

    describe('PUT /api/product/:id', () => {
        test('devrait permettre à un admin de modifier un produit', async () => {
            const response = await request(app)
                .put(`/api/product/${testProductId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    name: 'Pikachu Modifié',
                    price: 60000
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('name', 'Pikachu Modifié');
        });

        test('devrait empêcher un user normal de modifier un produit', async () => {
            const response = await request(app)
                .put(`/api/product/${testProductId}`)
                .set('Authorization', `Bearer ${userToken}`)
                .send({
                    name: 'Tentative de hack'
                });

            expect(response.status).toBe(403);
        });
    });

    describe('DELETE /api/product/:id', () => {
        test('devrait permettre à un admin de supprimer un produit', async () => {
            const response = await request(app)
                .delete(`/api/product/${testProductId}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(204);
        });

        test('devrait empêcher un user normal de supprimer un produit', async () => {
            const response = await request(app)
                .delete(`/api/product/${testProductId}`)
                .set('Authorization', `Bearer ${userToken}`);

            expect(response.status).toBe(403);
        });
    });

    describe('GET /api/product/countProductSellInMonth', () => {
        test('devrait permettre à un admin de voir les stats', async () => {
            const response = await request(app)
                .get('/api/product/countProductSellInMonth')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('currentMonthSell');
            expect(response.body).toHaveProperty('lastMonthSell');
            expect(response.body).toHaveProperty('growthRateSell');
        });

        test('devrait empêcher un user normal de voir les stats', async () => {
            const response = await request(app)
                .get('/api/product/countProductSellInMonth')
                .set('Authorization', `Bearer ${userToken}`);

            expect(response.status).toBe(403);
        });
    });
}); 