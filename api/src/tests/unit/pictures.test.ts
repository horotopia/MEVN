import { PicturesService } from '../../services/mongoose/pictures.service';
import { MongooseService } from '../../services/mongoose/mongoose.service';
import mockingoose from 'mockingoose';
import { Pictures } from '../../models';

describe('PicturesService', () => {
  let picturesService: PicturesService;
  let mongooseService: MongooseService;

  beforeAll(() => {
    mongooseService = new MongooseService();
    picturesService = new PicturesService(mongooseService);
  });

  beforeEach(() => {
    mockingoose.resetAll();
  });

  describe('createPicture', () => {
    it('should create a new picture successfully', async () => {
      const mockPicture = {
        userId: '507f191e810c19729de860ea',
        productId: '507f191e810c19729de860eb',
        name: 'image.jpg',
        description: 'Une image de test',
      };

      mockingoose(Pictures).toReturn(mockPicture, 'save');

      const result = await picturesService.createPicture(mockPicture);

      expect(result).toEqual(expect.objectContaining(mockPicture));
    });
  });

  describe('findAllPicturesByUserId', () => {
    it('should find all pictures by user id', async () => {
      const mockPicturesList = [
        {
          _id: '507f191e810c19729de860ea',
          userId: '507f191e810c19729de860eb',
          productId: '507f191e810c19729de860ec',
          name: 'image1.jpg',
          description: 'Une image de test 1',
        },
        {
          _id: '507f191e810c19729de860eb',
          userId: '507f191e810c19729de860eb',
          productId: '507f191e810c19729de860ed',
          name: 'image2.jpg',
          description: 'Une image de test 2',
        },
      ];

      mockingoose(Pictures).toReturn(mockPicturesList, 'find');

      const result = await picturesService.findAllPicturesByUserId('507f191e810c19729de860eb');

      expect(result).toEqual(expect.arrayContaining(mockPicturesList));
    });
  });

  describe('findPicturesById', () => {
    it('should find a picture by id', async () => {
      const mockPicture = {
        _id: '507f191e810c19729de860ea',
        userId: '507f191e810c19729de860eb',
        productId: '507f191e810c19729de860ec',
        name: 'image.jpg',
        description: 'Une image de test',
      };

      mockingoose(Pictures).toReturn(mockPicture, 'findOne');

      const result = await picturesService.findPicturesById('507f191e810c19729de860ea');

      expect(result).toEqual(expect.objectContaining(mockPicture));
    });

    it('should return null if picture not found', async () => {
      mockingoose(Pictures).toReturn(null, 'findOne');

      const result = await picturesService.findPicturesById('507f191e810c19729de860ea');

      expect(result).toBeNull();
    });
  });

  describe('updatePictures', () => {
    it('should update a picture successfully', async () => {
      const mockPicture = {
        _id: '507f191e810c19729de860ea',
        userId: '507f191e810c19729de860eb',
        productId: '507f191e810c19729de860ec',
        name: 'image.jpg',
        description: 'Une image de test',
      };

      const updatedPicture = {
        ...mockPicture,
        description: 'Une image mise à jour',
      };

      mockingoose(Pictures).toReturn(updatedPicture, 'findOneAndUpdate');

      const result = await picturesService.updatePictures('507f191e810c19729de860ea', { description: 'Une image mise à jour' });

      expect(result).toEqual(expect.objectContaining(updatedPicture));
    });

    it('should return null if picture not found', async () => {
      mockingoose(Pictures).toReturn(null, 'findOneAndUpdate');

      const result = await picturesService.updatePictures('507f191e810c19729de860ea', { description: 'Une image mise à jour' });

      expect(result).toBeNull();
    });
  });

  describe('deletePictures', () => {
    it('should delete a picture successfully', async () => {
      const mockPicture = {
        _id: '507f191e810c19729de860ea',
        userId: '507f191e810c19729de860eb',
        productId: '507f191e810c19729de860ec',
        name: 'image.jpg',
        description: 'Une image de test',
      };

      mockingoose(Pictures).toReturn(mockPicture, 'findOneAndDelete');

      const result = await picturesService.deletePictures('507f191e810c19729de860ea');

      expect(result).toEqual(expect.objectContaining(mockPicture));
    });

    it('should return null if picture not found', async () => {
      mockingoose(Pictures).toReturn(null, 'findOneAndDelete');

      const result = await picturesService.deletePictures('507f191e810c19729de860ea');

      expect(result).toBeNull();
    });
  });

  describe('deleteAllPicturesByUserId', () => {
    it('should delete all pictures by user id successfully', async () => {
      const mockDeleteResult = { n: 2, ok: 1, deletedCount: 2 };

      mockingoose(Pictures).toReturn(mockDeleteResult, 'deleteMany');

      await picturesService.deleteAllPicturesByUserId('507f191e810c19729de860eb');

      const result = await Pictures.deleteMany({ userId: '507f191e810c19729de860eb' });

      expect(result).toEqual(expect.objectContaining(mockDeleteResult));
    });
  });

  describe('findAllPicturesByProductId', () => {
    it('should find all pictures by product id', async () => {
      const mockPicturesList = [
        {
          _id: '507f191e810c19729de860ea',
          userId: '507f191e810c19729de860eb',
          productId: '507f191e810c19729de860ec',
          name: 'image1.jpg',
          description: 'Une image de test 1',
        },
        {
          _id: '507f191e810c19729de860eb',
          userId: '507f191e810c19729de860eb',
          productId: '507f191e810c19729de860ec',
          name: 'image2.jpg',
          description: 'Une image de test 2',
        },
      ];

      mockingoose(Pictures).toReturn(mockPicturesList, 'find');

      const result = await picturesService.findAllPicturesByProductId('507f191e810c19729de860ec');

      expect(result).toEqual(expect.arrayContaining(mockPicturesList));
    });
  });

  describe('deleteAllPicturesByProductId', () => {
    it('should delete all pictures by product id successfully', async () => {
      const mockDeleteResult = { n: 2, ok: 1, deletedCount: 2 };

      mockingoose(Pictures).toReturn(mockDeleteResult, 'deleteMany');

      await picturesService.deleteAllPicturesByProductId('507f191e810c19729de860ec');

      const result = await Pictures.deleteMany({ productId: '507f191e810c19729de860ec' });

      expect(result).toEqual(expect.objectContaining(mockDeleteResult));
    });
  });
});
