const mockingoose = require("mockingoose");
import { User, UserModel, Pictures, PicturesModel, Address } from '../../models';

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
});
