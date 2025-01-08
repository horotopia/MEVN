import { FavorisService } from '../../services/mongoose/favoris.service';
import { MongooseService } from '../../services/mongoose/mongoose.service';
import mockingoose from 'mockingoose';
import { Favoris } from '../../models';

describe('FavorisService', () => {
  let favorisService: FavorisService;
  let mongooseService: MongooseService;

  beforeAll(() => {
    mongooseService = new MongooseService();
    favorisService = new FavorisService(mongooseService);
  });

  beforeEach(() => {
    mockingoose.resetAll();
  });

  describe('createFavoris', () => {
    it('should create a new favoris successfully', async () => {
      const mockFavoris = {
        userId: '507f191e810c19729de860ea',
        productId: '507f191e810c19729de860eb',
      };

      mockingoose(Favoris).toReturn(mockFavoris, 'save');

      const result = await favorisService.createFavoris(mockFavoris);

      expect(result).toEqual(expect.objectContaining(mockFavoris));
    });
  });

  describe('findFavorisById', () => {
    it('should find a favoris by id', async () => {
      const mockFavoris = {
        _id: '507f191e810c19729de860ea',
        userId: '507f191e810c19729de860eb',
        productId: '507f191e810c19729de860ec',
      };

      mockingoose(Favoris).toReturn(mockFavoris, 'findOne');

      const result = await favorisService.findFavorisById('507f191e810c19729de860ea');

      expect(result).toEqual(expect.objectContaining(mockFavoris));
    });

    it('should return null if favoris not found', async () => {
      mockingoose(Favoris).toReturn(null, 'findOne');

      const result = await favorisService.findFavorisById('507f191e810c19729de860ea');

      expect(result).toBeNull();
    });
  });

  describe('findAllFavorisByUserId', () => {
    it('should find all favoris by user id', async () => {
      const mockFavorisList = [
        {
          _id: '507f191e810c19729de860ea',
          userId: '507f191e810c19729de860eb',
          productId: '507f191e810c19729de860ec',
        },
        {
          _id: '507f191e810c19729de860eb',
          userId: '507f191e810c19729de860eb',
          productId: '507f191e810c19729de860ed',
        },
      ];

      mockingoose(Favoris).toReturn(mockFavorisList, 'find');

      const result = await favorisService.findAllFavorisByUserId('507f191e810c19729de860eb');

      expect(result).toEqual(expect.arrayContaining(mockFavorisList));
    });
  });

  describe('deleteFavoris', () => {
    it('should delete a favoris successfully', async () => {
      const mockFavoris = {
        _id: '507f191e810c19729de860ea',
        userId: '507f191e810c19729de860eb',
        productId: '507f191e810c19729de860ec',
      };

      mockingoose(Favoris).toReturn(mockFavoris, 'findOneAndDelete');

      const result = await favorisService.deleteFavoris('507f191e810c19729de860ea');

      expect(result).toEqual(expect.objectContaining(mockFavoris));
    });

    it('should return null if favoris not found', async () => {
      mockingoose(Favoris).toReturn(null, 'findOneAndDelete');

      const result = await favorisService.deleteFavoris('507f191e810c19729de860ea');

      expect(result).toBeNull();
    });
  });

  describe('deleteAllFavorisByUserId', () => {
    it('should delete all favoris by user id successfully', async () => {
      const mockDeleteResult = { n: 2, ok: 1, deletedCount: 2 };

      mockingoose(Favoris).toReturn(mockDeleteResult, 'deleteMany');

      await favorisService.deleteAllFavorisByUserId('507f191e810c19729de860eb');

      const result = await Favoris.deleteMany({ userId: '507f191e810c19729de860eb' });

      expect(result).toEqual(expect.objectContaining(mockDeleteResult));
    });
  });
});
