import { CartsService } from '../../services/mongoose/carts.service';
import { MongooseService } from '../../services/mongoose/mongoose.service';
import mockingoose from 'mockingoose';
import { Carts } from '../../models';

describe('CartsService', () => {
  let cartsService: CartsService;
  let mongooseService: MongooseService;

  beforeAll(() => {
    mongooseService = new MongooseService();
    cartsService = new CartsService(mongooseService);
  });

  beforeEach(() => {
    mockingoose.resetAll();
  });

  describe('createCart', () => {
    it('should create a new cart successfully', async () => {
      const mockCart = {
        userId: '507f191e810c19729de860ea',
        items: [
          { productId: '507f191e810c19729de860eb', quantity: 2 },
        ],
      };

      mockingoose(Carts).toReturn(mockCart, 'save');

      const result = await cartsService.createCart(mockCart);

      expect(result).toEqual(expect.objectContaining(mockCart));
    });
  });

  describe('findCartById', () => {
    it('should find a cart by id', async () => {
      const mockCart = {
        _id: '507f191e810c19729de860ea',
        userId: '507f191e810c19729de860eb',
        items: [
          { productId: '507f191e810c19729de860ec', quantity: 2 },
        ],
      };

      mockingoose(Carts).toReturn(mockCart, 'findOne');

      const result = await cartsService.findCartById('507f191e810c19729de860ea');

      expect(result).toEqual(expect.objectContaining(mockCart));
    });

    it('should return null if cart not found', async () => {
      mockingoose(Carts).toReturn(null, 'findOne');

      const result = await cartsService.findCartById('507f191e810c19729de860ea');

      expect(result).toBeNull();
    });
  });

  describe('findCartsByUserId', () => {
    it('should find all carts by user id', async () => {
      const mockCarts = [
        {
          _id: '507f191e810c19729de860ea',
          userId: '507f191e810c19729de860eb',
          items: [
            { productId: '507f191e810c19729de860ec', quantity: 2 },
          ],
        },
        {
          _id: '507f191e810c19729de860eb',
          userId: '507f191e810c19729de860eb',
          items: [
            { productId: '507f191e810c19729de860ed', quantity: 1 },
          ],
        },
      ];

      mockingoose(Carts).toReturn(mockCarts, 'find');

      const result = await cartsService.findCartsByUserId('507f191e810c19729de860eb');

      expect(result).toEqual(expect.arrayContaining(mockCarts));
    });
  });

  describe('updateCart', () => {
    it('should update a cart successfully', async () => {
      const mockCart = {
        _id: '507f191e810c19729de860ea',
        userId: '507f191e810c19729de860eb',
        items: [
          { productId: '507f191e810c19729de860ec', quantity: 2 },
        ],
      };

      const updatedCart = {
        ...mockCart,
        items: [
          { productId: '507f191e810c19729de860ec', quantity: 3 },
        ],
      };

      mockingoose(Carts).toReturn(updatedCart, 'findOneAndUpdate');

      const result = await cartsService.updateCart('507f191e810c19729de860ea', { items: [{ productId: '507f191e810c19729de860ec', quantity: 3 }] });

      expect(result).toEqual(expect.objectContaining(updatedCart));
    });

    it('should return null if cart not found', async () => {
      mockingoose(Carts).toReturn(null, 'findOneAndUpdate');

      const result = await cartsService.updateCart('507f191e810c19729de860ea', { items: [{ productId: '507f191e810c19729de860ec', quantity: 3 }] });

      expect(result).toBeNull();
    });
  });

  describe('deleteCart', () => {
    it('should delete a cart successfully', async () => {
      const mockCart = {
        _id: '507f191e810c19729de860ea',
        userId: '507f191e810c19729de860eb',
        items: [
          { productId: '507f191e810c19729de860ec', quantity: 2 },
        ],
      };

      mockingoose(Carts).toReturn(mockCart, 'findOneAndDelete');

      const result = await cartsService.deleteCart('507f191e810c19729de860ea');

      expect(result).toEqual(expect.objectContaining(mockCart));
    });

    it('should return null if cart not found', async () => {
      mockingoose(Carts).toReturn(null, 'findOneAndDelete');

      const result = await cartsService.deleteCart('507f191e810c19729de860ea');

      expect(result).toBeNull();
    });
  });

  describe('deleteCartsByUserId', () => {
    it('should delete all carts by user id successfully', async () => {
      const mockDeleteResult = { n: 2, ok: 1, deletedCount: 2 };

      mockingoose(Carts).toReturn(mockDeleteResult, 'deleteMany');

      await cartsService.deleteCartsByUserId('507f191e810c19729de860eb');

      const result = await Carts.deleteMany({ userId: '507f191e810c19729de860eb' });

      expect(result).toEqual(expect.objectContaining(mockDeleteResult));
    });
  });
});
