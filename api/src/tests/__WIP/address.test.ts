// import { AddressService } from '../../services/mongoose/address.service';
// import { MongooseService } from '../../services/mongoose/mongoose.service';
// import mockingoose from 'mockingoose';
// import { Address } from '../../models';
// import { model } from 'mongoose';
// import { addressSchema } from '../../services/mongoose/schema';

// describe('AddressService', () => {
//   let addressService: AddressService;
//   let mongooseService: MongooseService;
//   const AddressModel = model<Address>('Address', addressSchema);

//   beforeAll( async () => {
//     mongooseService = await MongooseService.get();
//     addressService = new AddressService(mongooseService);
//   });

//   beforeEach(() => {
//     mockingoose.resetAll();
//   });

//   describe('createAddress', () => {
//     it.skip('should create a new address successfully', async () => {
//       const mockAddress = {
//         userId: new mongoose.Types.ObjectId('507f191e810c19729de860ea'),
//         street: '5th Avenue',
//         city: 'New York',
//         postalCode: '10001',
//         country: 'USA',
//       };

//       mockingoose(AddressModel).toReturn(mockAddress, 'save');

//       const result = await addressService.createAddress(mockAddress);

//       expect(result).toEqual(expect.objectContaining(mockAddress));
//     });
//   });

//   describe('findAllAddressesByUserId', () => {
//     it.skip('should find all addresses by user id', async () => {
//       const mockAddresses = [
//         {
//           _id: '507f191e810c19729de860ea',
//           userId: '507f191e810c19729de860eb',
//           street: '5th Avenue',
//           city: 'New York',
//           postalCode: '10001',
//           country: 'USA',
//         },
//         {
//           _id: '507f191e810c19729de860eb',
//           userId: '507f191e810c19729de860eb',
//           street: '6th Avenue',
//           city: 'New York',
//           postalCode: '10002',
//           country: 'USA',
//         },
//       ];

//       mockingoose(Address).toReturn(mockAddresses, 'find');

//       const result = await addressService.findAllAddressesByUserId('507f191e810c19729de860eb');

//       expect(result).toEqual(expect.arrayContaining(mockAddresses));
//     });
//   });

//   describe('updateAddress', () => {
//     it.skip('should update an address successfully', async () => {
//       const mockAddress = {
//         _id: '507f191e810c19729de860ea',
//         userId: '507f191e810c19729de860eb',
//         street: '5th Avenue',
//         city: 'New York',
//         postalCode: '10001',
//         country: 'USA',
//       };

//       const updatedAddress = {
//         ...mockAddress,
//         street: '7th Avenue',
//       };

//       mockingoose(Address).toReturn(updatedAddress, 'findOneAndUpdate');

//       const result = await addressService.updateAddress('507f191e810c19729de860ea', { street: '7th Avenue' });

//       expect(result).toEqual(expect.objectContaining(updatedAddress));
//     });

//     it.skip('should return null if address not found', async () => {
//       mockingoose(Address).toReturn(null, 'findOneAndUpdate');

//       const result = await addressService.updateAddress('507f191e810c19729de860ea', { street: '7th Avenue' });

//       expect(result).toBeNull();
//     });
//   });

//   describe('deleteAddress', () => {
//     it.skip('should delete an address successfully', async () => {
//       const mockAddress = {
//         _id: '507f191e810c19729de860ea',
//         userId: '507f191e810c19729de860eb',
//         street: '5th Avenue',
//         city: 'New York',
//         postalCode: '10001',
//         country: 'USA',
//       };

//       mockingoose(Address).toReturn(mockAddress, 'findOneAndDelete');

//       const result = await addressService.deleteAddress('507f191e810c19729de860ea');

//       expect(result).toEqual(expect.objectContaining(mockAddress));
//     });

//     it.skip('should return null if address not found', async () => {
//       mockingoose(Address).toReturn(null, 'findOneAndDelete');

//       const result = await addressService.deleteAddress('507f191e810c19729de860ea');

//       expect(result).toBeNull();
//     });
//   });

//   describe('anonymise', () => {
//     it.skip('should anonymise addresses successfully', async () => {
//       const mockUpdateResult = { n: 2, nModified: 2, ok: 1 };

//       mockingoose(Address).toReturn(mockUpdateResult, 'updateMany');

//       await addressService.anonymise('507f191e810c19729de860eb');

//       const result = await Address.updateMany({ userId: '507f191e810c19729de860eb' });

//       expect(result).toEqual(expect.objectContaining(mockUpdateResult));
//     });
//   });
// });
