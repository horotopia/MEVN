import { SessionService } from '../../services/mongoose/session.service';
import { MongooseService } from '../../services/mongoose/mongoose.service';
import mockingoose from 'mockingoose';
import { Session } from '../../models';

describe('SessionService', () => {

  beforeAll(() => {
    mongooseService = new MongooseService();
    sessionService = new SessionService(mongooseService);
  });

  beforeEach(() => {
    mockingoose.resetAll();
  });

  describe('createSession', () => {
    it('should create a new session successfully', async () => {
      const mockSession = {
        userAgent: 'Mozilla/5.0',
        user: '507f191e810c19729de860ea',
      };

      mockingoose(Session).toReturn(mockSession, 'save');

      const result = await sessionService.createSession(mockSession);

      expect(result).toEqual(expect.objectContaining(mockSession));
    });
  });

  describe('findActiveSession', () => {
    it('should find an active session by id', async () => {
      const mockSession = {
        _id: '507f191e810c19729de860ea',
        userAgent: 'Mozilla/5.0',
        user: '507f191e810c19729de860eb',
        expirationDate: new Date(Date.now() + 10000),
      };

      mockingoose(Session).toReturn(mockSession, 'findOne');

      const result = await sessionService.findActiveSession('507f191e810c19729de860ea');

      expect(result).toEqual(expect.objectContaining(mockSession));
    });

    it('should return null if session not found', async () => {
      mockingoose(Session).toReturn(null, 'findOne');

      const result = await sessionService.findActiveSession('507f191e810c19729de860ea');

      expect(result).toBeNull();
    });
  });

  describe('increaseExpirationDate', () => {
    it('should increase the expiration date of a session successfully', async () => {
      const mockSession = {
        _id: '507f191e810c19729de860ea',
        userAgent: 'Mozilla/5.0',
        user: '507f191e810c19729de860eb',
        expirationDate: new Date(Date.now() + 10000),
      };

      const updatedSession = {
        ...mockSession,
        expirationDate: new Date(Date.now() + 1_296_000_000),
      };

      mockingoose(Session).toReturn(updatedSession, 'findOneAndUpdate');

      const result = await sessionService.increaseExpirationDate('507f191e810c19729de860ea');

      expect(result).toEqual(expect.objectContaining(updatedSession));
    });

    it('should return null if session not found', async () => {
      mockingoose(Session).toReturn(null, 'findOneAndUpdate');

      const result = await sessionService.increaseExpirationDate('507f191e810c19729de860ea');

      expect(result).toBeNull();
    });
  });

  describe('countSessionByMonth', () => {
    it('should count sessions by month and calculate growth rate', async () => {
      const mockCurrentMonthSessions = 10;
      const mockLastMonthSessions = 5;

      jest.spyOn(Session, 'countDocuments')
        .mockResolvedValueOnce(mockCurrentMonthSessions)
        .mockResolvedValueOnce(mockLastMonthSessions);

      const result = await sessionService.countSessionByMonth();

      expect(result).toEqual({
        currentMonthSession: mockCurrentMonthSessions,
        lastMonthSession: mockLastMonthSessions,
        growthRateSession: 100,
      });
    });
  });
});
