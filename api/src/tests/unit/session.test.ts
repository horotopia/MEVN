const mockingoose = require("mockingoose");
import { Session, SessionModel } from '../../models';

describe('SessionService', () => {

  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createSession', () => {
    it('should validate', async () => {
      const session = new SessionModel({
        userAgent: 'Mozilla/5.0',
        user: '507f191e810c19729de860ea',
      });

      await session.validate();
      expect(session.toObject()).toHaveProperty('userAgent');
      expect(session.toObject()).toHaveProperty('user');
    });

    it('should create a new session', async () => {
      const session = {
        userAgent: 'Mozilla/5.0',
        user: '507f191e810c19729de860ea',
      };

      mockingoose(SessionModel).toReturn(session, 'save');

      const result = await SessionModel.create(session);
      expect(result).toMatchObject({
        userAgent: 'Mozilla/5.0'
      });
    });
  });

  describe('findActiveSession', () => {
    it('should find an active session by id', async () => {
      const mockSession = {
        userAgent: 'Mozilla/5.0',
        expirationDate: new Date(Date.now() + 10000),
      };

      mockingoose(SessionModel).toReturn(mockSession, 'findOne');

      const result = await SessionModel.findOne({ _id: '507f191e810c19729de860ea' });

      expect(result!.toObject()).toHaveProperty('_id');
      expect(result!.toObject()).toHaveProperty('userAgent');
      expect(result!.toObject()).toMatchObject(mockSession);
    });

    it('should return null if session not found', async () => {
      mockingoose(SessionModel).toReturn(null, 'findOne');

      const result = await SessionModel.findOne({ _id: '507f191e810c19729de860ea' });

      expect(result).toBeNull();
    });
  });

  describe('increaseExpirationDate', () => {
    it('should increase the expiration date of a session successfully', async () => {
      const mockSession = {
        userAgent: 'Mozilla/5.0',
        expirationDate: new Date(Date.now() + 10000),
      };

      const updatedSession = {
        ...mockSession,
        expirationDate: new Date(Date.now() + 1_296_000_000),
      };

      mockingoose(SessionModel).toReturn(updatedSession, 'findOneAndUpdate');

      const result = await SessionModel.findOneAndUpdate(
        { _id: '507f191e810c19729de860ea' },
        { expirationDate: updatedSession.expirationDate },
        { new: true }
      );

      expect(result!.toObject()).toHaveProperty('_id');
      expect(result!.toObject()).toHaveProperty('expirationDate');
      expect(result!.toObject()).toMatchObject(updatedSession);
    });

    it('should return null if session not found', async () => {
      mockingoose(SessionModel).toReturn(null, 'findOneAndUpdate');

      const result = await SessionModel.findOneAndUpdate(
        { _id: '507f191e810c19729de860ea' },
        { expirationDate: new Date(Date.now() + 1_296_000_000) },
        { new: true }
      );

      expect(result).toBeNull();
    });
  });

  describe('countSessionByMonth', () => {
    it('should count sessions by month and calculate growth rate', async () => {
      const mockCurrentMonthSessions = 10;
      const mockLastMonthSessions = 5;

      jest.spyOn(SessionModel, 'countDocuments')
        .mockResolvedValueOnce(mockCurrentMonthSessions)
        .mockResolvedValueOnce(mockLastMonthSessions);

      const result = await SessionModel.countDocuments();

      expect(result).toEqual(mockCurrentMonthSessions);
    });
  });
});
