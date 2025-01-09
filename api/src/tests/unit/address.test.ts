const mockingoose = require('mockingoose');
import { ObjectId } from 'mongodb';
import { AddressModel } from '../../models';

describe('AddressService', () => {
    beforeEach(() => {
        mockingoose.resetAll();
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createAddress', () => {
        it('should create a new address successfully', async () => {
            const mockAddress = {
                userId: '507f191e810c19729de860eb',
                street: '5th Avenue',
                city: 'New York',
                postalCode: '10001',
                country: 'USA',
            };

            mockingoose(AddressModel).toReturn(mockAddress, 'save');

            const result = await AddressModel.create(mockAddress);

            expect(result.toObject()).toHaveProperty('_id');
            expect(result.toObject()).toHaveProperty('street');
            expect(result.toObject()).toMatchObject({
                street: '5th Avenue',
                city: 'New York',
                postalCode: '10001',
                country: 'USA',
            })
        });
    });

    describe('findAllAddressesByUserId', () => {
        it('should find all addresses by user id', async () => {
            const mockAddresses = [
                {
                    _id: expect.any(ObjectId),
                    userId: expect.any(ObjectId),
                    street: '5th Avenue',
                    city: 'New York',
                    postalCode: '10001',
                    country: 'USA',
                },
                {
                    _id: expect.any(ObjectId),
                    userId: expect.any(ObjectId),
                    street: '6th Avenue',
                    city: 'New York',
                    postalCode: '10002',
                    country: 'USA',
                },
            ];

            mockingoose(AddressModel).toReturn(mockAddresses, 'find');

            const result = await AddressModel.find({ userId: '507f191e810c19729de860eb' });

            expect(result).toHaveLength(2);
            expect(result[0].toObject()).toHaveProperty('_id');
            expect(result[0].toObject()).toHaveProperty('street');
            expect(result[0].toObject()).toMatchObject({
                street: '5th Avenue',
                city: 'New York',
                postalCode: '10001',
                country: 'USA',
            });
            expect(result[1].toObject()).toHaveProperty('_id');
            expect(result[1].toObject()).toHaveProperty('street');
            expect(result[1].toObject()).toMatchObject({
                street: '6th Avenue',
                city: 'New York',
                postalCode: '10002',
                country: 'USA',
            });
        });
    });

    describe('updateAddress', () => {
        it('should update an address successfully', async () => {
            const mockAddress = {
                _id: expect.any(ObjectId),
                userId: expect.any(ObjectId),
                street: '5th Avenue',
                city: 'New York',
                postalCode: '10001',
                country: 'USA',
            };

            const updatedAddress = {
                ...mockAddress,
                street: '7th Avenue',
            };

            mockingoose(AddressModel).toReturn(updatedAddress, 'findOneAndUpdate');

            const result = await AddressModel.findOneAndUpdate(
                { _id: '507f191e810c19729de860ea' },
                { street: '7th Avenue' },
                { new: true }
            );

            expect(result!.toObject()).toHaveProperty('_id');
            expect(result!.toObject()).toHaveProperty('street');
            expect(result!.toObject()).toMatchObject({
                street: '7th Avenue',
                city: 'New York',
                postalCode: '10001',
                country: 'USA',
            });
        });

        it('should return null if address not found', async () => {
            mockingoose(AddressModel).toReturn(null, 'findOneAndUpdate');

            const result = await AddressModel.findOneAndUpdate(
                { _id: '507f191e810c19729de860ea' },
                { street: '7th Avenue' },
                { new: true }
            );

            expect(result).toBeNull();
        });
    });

    describe('deleteAddress', () => {
        it('should delete an address successfully', async () => {
            const mockAddress = {
                _id: expect.any(ObjectId),
                userId: expect.any(ObjectId),
                street: '5th Avenue',
                city: 'New York',
                postalCode: '10001',
                country: 'USA',
            };

            mockingoose(AddressModel).toReturn(mockAddress, 'findOneAndDelete');

            const result = await AddressModel.findOneAndDelete({ _id: '507f191e810c19729de860ea' });

            expect(result!.toObject()).toHaveProperty('_id');
            expect(result!.toObject()).toHaveProperty('street');
            expect(result!.toObject()).toMatchObject({
                street: '5th Avenue',
                city: 'New York',
                postalCode: '10001',
                country: 'USA',
            })
        });

        it('should return null if address not found', async () => {
            mockingoose(AddressModel).toReturn(null, 'findOneAndDelete');

            const result = await AddressModel.findOneAndDelete({ _id: '507f191e810c19729de860ea' });

            expect(result).toBeNull();
        });
    });

    describe('anonymise', () => {
        it('should anonymise addresses successfully', async () => {
            const mockUpdateResult = { n: 2, nModified: 2, ok: 1 };

            mockingoose(AddressModel).toReturn(mockUpdateResult, 'updateMany');

            const result = await AddressModel.updateMany(
                { userId: '507f191e810c19729de860eb' },
                { street: 'Anonymised', city: 'Anonymised', postalCode: '00000', country: 'Anonymised' }
            );

            expect(result).toMatchObject(mockUpdateResult);
        });
    });
});
