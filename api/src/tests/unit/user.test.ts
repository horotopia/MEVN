const mockingoose = require("mockingoose");
import { User, UserModel, Pictures, PicturesModel, Address } from '../../models';
import { UpdateUser } from '../../models/user.interface';

describe('UserService', () => {
    beforeEach(() => {
        mockingoose.resetAll();
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createUser', () => {
        it('should validate', async () => {
            const user = new UserModel({
                _id: '507f191e810c19729de860ea',
                email: 'user@email.com',
                name: 'user',
                password: 'password',
                tel: '0102030405'
            });

            await user.validate();
            expect(user.toObject()).toHaveProperty('email');
            expect(user.toObject()).toHaveProperty('_id');
        });

        it('should create a new user', async () => {
            const user: Partial<User> = {
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: 'password123',
                tel: '0102030405',
                isEmailVerified: false
            };

            mockingoose(UserModel).toReturn(user, 'save');

            const result = await UserModel.create(user);
            expect(result).toMatchObject({
                name: 'John Doe'
            });
        });
    });

    describe('findUser', () => {
        it('should find a user by email', async () => {
            const email = 'johndoe@example.com';
            const userId = '507f1f77bcf86cd799439011';
            const user: Partial<User> = {
                email,
                isEmailVerified: true,
                role: 'ROLE_USER'
            };
            const pictures = [{
                userId: userId,
                url: 'pic_url'
            }];

            mockingoose(UserModel).toReturn(user, 'findOne');
            // mockingoose(PicturesModel).toReturn(pictures, 'find');

            const result = await UserModel.findOne({ email });
            // console.log('findOne', { ...user, pictures });

            expect(result!.toObject()).toHaveProperty('_id');
            expect(result!.toObject()).toHaveProperty('email');
            expect(result!.toObject()).toMatchObject({ email: email });
            // expect(result!.toObject()).toMatchObject({ pictures: pictures });
        });

        it('should return null if user is not found', async () => {
            const email = 'johndoe@example.com';

            mockingoose(UserModel).toReturn(null, 'findOne');

            const result = await UserModel.findOne({ email });
            expect(result).toBeNull();
        });
    });

    describe('findUserById', () => {
        it('should find a user by id', async () => {
            const userId = '507f1f77bcf86cd799439011';
            const user = {
                email: 'johndoe@example.com',
                isEmailVerified: true,
                role: 'ROLE_USER'
            };
            const pictures = [{ userId: userId, url: 'pic_url' }];

            mockingoose(UserModel).toReturn(user, 'findOne');
            // mockingoose(PicturesModel).toReturn(pictures, 'find');

            const result = await UserModel.findOne({
                _id: userId
            });

            expect(result!.toObject()).toHaveProperty('_id');
            expect(result!.toObject()).toHaveProperty('email');
            // expect(result!.toObject()).toMatchObject({ pictures: pictures });
        });

        it('should return null if user is not found', async () => {
            const id = '507f1f77bcf86cd799439011';

            mockingoose(UserModel).toReturn(null, 'findOne');

            const result = await UserModel.findOne({
                _id: id
            });

            expect(result).toBeNull();
        });
    });

    describe('findAllUsers', () => {
        it('should find all users', async () => {
            const usersId = ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012'];
            const users: Partial<User>[] = [
                {
                    name: 'John Doe',
                    email: 'test1@example.com',
                    tel: '0102030405',
                    isEmailVerified: true
                },
                {
                    name: 'Jane Doe',
                    email: 'test2@example.com',
                    tel: '0102030406',
                    isEmailVerified: true
                }
            ];
            const pictures = [
                { userId: usersId[0], url: 'pic_url1' },
                { userId: usersId[1], url: 'pic_url2' }
            ];

            mockingoose(UserModel).toReturn(users, 'find');
            // mockingoose(PicturesModel).toReturn(pictures, 'find');

            const result = await UserModel.find();
            console.log('find with pictures', result);

            users.forEach((user, idx) => {
                expect(result[idx].toObject()).toHaveProperty('_id');
                expect(result[idx].toObject()).toHaveProperty('name');
                expect(result[idx].toObject()).toMatchObject({ email: user.email });
                // expect(result[idx].toObject()).toMatchObject({ pictures: [pictures[idx]] });
            });
        });
    });

    describe('updateUser', () => {
        it('should update a user by id', async () => {
            const userId = '507f1f77bcf86cd799439011';
            const update: Partial<UpdateUser> = {
                name: 'Updated User'
            };
            const updatedUser: Partial<User> = {
                ...update,
                email: 'johndoe@example.com',
                tel: '0102030405',
                isEmailVerified: false
            };

            mockingoose(UserModel).toReturn(updatedUser, 'findOneAndUpdate');

            const result = await UserModel.findByIdAndUpdate(userId, update, { new: true });

            expect(result!.toObject()).toHaveProperty('_id');
            expect(result!.toObject()).toHaveProperty('name');
            expect(result!.toObject()).toMatchObject({ name: 'Updated User' });
            expect(result!.toObject()).toMatchObject({ email: 'johndoe@example.com' });
        });
    });

    // describe('deleteUser', () => {
    //     it('should anonymize and delete a user by id', async () => {
    //         const id = '507f1f77bcf86cd799439011';
    //         const anonymizedUser = { _id: id, name: 'Anonyme', email: `${id}@deleted.com`, password: 'deleted' };

    //         mockingoose(UserModel).toReturn(anonymizedUser, 'findOneAndUpdate');
    //         const addressServiceMock = jest.spyOn(AddressService.prototype, 'anonymise').mockResolvedValue();

    //         const result = await UserModel.deleteUser(id);

    //         expect(result).toEqual(anonymizedUser);
    //         expect(addressServiceMock).toHaveBeenCalledWith(id);
    //     });
    // });

    // describe('countUsersByMonth', () => {
    //     it('should count users by month and calculate growth rate', async () => {
    //         const currentMonthUsers = 10;
    //         const lastMonthUsers = 5;

    //         mockingoose(UserModel).toReturn(currentMonthUsers, 'countDocuments');
    //         mockingoose(UserModel).toReturn(lastMonthUsers, 'countDocuments');

    //         const result = await UserModel

    //         expect(result).toEqual({
    //             currentMonthUser: currentMonthUsers,
    //             lastMonthUser: lastMonthUsers,
    //             growthRateUser: 100
    //         });
    //     });
    // });

    describe('findUserByVerificationToken', () => {
        it('should find a user by verification token', async () => {
            const token = 'verification_token';
            const user: Partial<User> = {
                email: 'johndoe@example.com',
                password: 'password',
                tel: '0102030405',
                isEmailVerified: false,
                emailVerificationToken: token
            };

            mockingoose(UserModel).toReturn(user, 'findOne');

            const result = await UserModel.findOne({ emailVerificationToken: token });

            expect(result!.toObject()).toHaveProperty('_id');
            expect(result!.toObject()).toHaveProperty('email');
            expect(result!.toObject()).toMatchObject({ emailVerificationToken: token });
        });
    });
});
