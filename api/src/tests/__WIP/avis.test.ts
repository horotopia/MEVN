// import { AvisService } from '../../services/mongoose/avis.service';
// import { MongooseService } from '../../services/mongoose/mongoose.service';
// import mockingoose from 'mockingoose';
// import { Avis } from '../../models';

// describe('AvisService', () => {
//   let avisService: AvisService;
//   let mongooseService: MongooseService;

//   beforeAll(() => {
//     mongooseService = new MongooseService();
//     avisService = new AvisService(mongooseService);
//   });

//   beforeEach(() => {
//     mockingoose.resetAll();
//   });

//   describe('createAvis', () => {
//     it.skip('should create a new avis successfully', async () => {
//       const mockAvis = {
//         userId: '507f191e810c19729de860ea',
//         productId: '507f191e810c19729de860eb',
//         rating: 5,
//         comment: 'Super produit !',
//       };

//       mockingoose(Avis).toReturn(mockAvis, 'save');

//       const result = await avisService.createAvis(mockAvis);

//       expect(result).toEqual(expect.objectContaining(mockAvis));
//     });
//   });

//   describe('findAllAvisByProductId', () => {
//     it.skip('should find all avis by product id', async () => {
//       const mockAvisList = [
//         {
//           _id: '507f191e810c19729de860ea',
//           userId: '507f191e810c19729de860eb',
//           productId: '507f191e810c19729de860ec',
//           rating: 5,
//           comment: 'Super produit !',
//         },
//         {
//           _id: '507f191e810c19729de860eb',
//           userId: '507f191e810c19729de860eb',
//           productId: '507f191e810c19729de860ec',
//           rating: 4,
//           comment: 'Très bon produit.',
//         },
//       ];

//       mockingoose(Avis).toReturn(mockAvisList, 'find');

//       const result = await avisService.findAllAvisByProductId('507f191e810c19729de860ec');

//       expect(result).toEqual(expect.arrayContaining(mockAvisList));
//     });
//   });

//   describe('findAllAvisByUserId', () => {
//     it.skip('should find all avis by user id', async () => {
//       const mockAvisList = [
//         {
//           _id: '507f191e810c19729de860ea',
//           userId: '507f191e810c19729de860eb',
//           productId: '507f191e810c19729de860ec',
//           rating: 5,
//           comment: 'Super produit !',
//         },
//         {
//           _id: '507f191e810c19729de860eb',
//           userId: '507f191e810c19729de860eb',
//           productId: '507f191e810c19729de860ec',
//           rating: 4,
//           comment: 'Très bon produit.',
//         },
//       ];

//       mockingoose(Avis).toReturn(mockAvisList, 'find');

//       const result = await avisService.findAllAvisByUserId('507f191e810c19729de860eb');

//       expect(result).toEqual(expect.arrayContaining(mockAvisList));
//     });
//   });

//   describe('updateAvis', () => {
//     it.skip('should update an avis successfully', async () => {
//       const mockAvis = {
//         _id: '507f191e810c19729de860ea',
//         userId: '507f191e810c19729de860eb',
//         productId: '507f191e810c19729de860ec',
//         rating: 5,
//         comment: 'Super produit !',
//       };

//       const updatedAvis = {
//         ...mockAvis,
//         comment: 'Produit correct.',
//       };

//       mockingoose(Avis).toReturn(updatedAvis, 'findOneAndUpdate');

//       const result = await avisService.updateAvis('507f191e810c19729de860ea', { comment: 'Produit correct.' });

//       expect(result).toEqual(expect.objectContaining(updatedAvis));
//     });

//     it.skip('should return null if avis not found', async () => {
//       mockingoose(Avis).toReturn(null, 'findOneAndUpdate');

//       const result = await avisService.updateAvis('507f191e810c19729de860ea', { comment: 'Produit correct.' });

//       expect(result).toBeNull();
//     });
//   });

//   describe('deleteAvis', () => {
//     it.skip('should delete an avis successfully', async () => {
//       const mockAvis = {
//         _id: '507f191e810c19729de860ea',
//         userId: '507f191e810c19729de860eb',
//         productId: '507f191e810c19729de860ec',
//         rating: 5,
//         comment: 'Super produit !',
//       };

//       mockingoose(Avis).toReturn(mockAvis, 'findOneAndDelete');

//       const result = await avisService.deleteAvis('507f191e810c19729de860ea');

//       expect(result).toEqual(expect.objectContaining(mockAvis));
//     });

//     it.skip('should throw an error if avis not found', async () => {
//       mockingoose(Avis).toReturn(null, 'findOneAndDelete');

//       await expect(avisService.deleteAvis('507f191e810c19729de860ea')).rejects.toThrow('Avis not found');
//     });
//   });

//   describe('anonymise', () => {
//     it.skip('should anonymise avis successfully', async () => {
//       const mockUpdateResult = { n: 2, nModified: 2, ok: 1 };

//       mockingoose(Avis).toReturn(mockUpdateResult, 'updateMany');

//       await avisService.anonymise('507f191e810c19729de860eb');

//       const result = await Avis.updateMany({ userId: '507f191e810c19729de860eb' });

//       expect(result).toEqual(expect.objectContaining(mockUpdateResult));
//     });
//   });
// });
