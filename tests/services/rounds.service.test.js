const mockSave = jest.fn();
const mockFind = jest.fn();
const mockFindById = jest.fn();

jest.mock('../../models/round.model', () => {
  const m = function() { return { save: mockSave }; };
  m.find = mockFind;
  m.findById = mockFindById;
  return m;
});

const service = require('../../services/rounds.service');

describe('rounds.service', () => {
  afterEach(() => jest.resetAllMocks());

  describe('getRound', () => {
    it('returns round', async () => {
      const obj = { title: 'r' };
      mockFindById.mockImplementation(() => ({
        populate: () => ({
          populate: () => ({
            populate: () => obj
          })
        })
      }));
      const res = await service.getRound('1');
      expect(res).toBe(obj);
    });

    it('throws on error', async () => {
      mockFindById.mockImplementation(() => { throw new Error('fail'); });
      await expect(service.getRound('1')).rejects.toThrow();
    });

    it('returns null when not found', async () => {
      mockFindById.mockImplementation(() => ({
        populate: () => ({
          populate: () => ({
            populate: () => null
          })
        })
      }));
      const res = await service.getRound('1');
      expect(res).toBeNull();
    });
  });

  describe('createRound', () => {
    const data = { title: 'r', exercisesId: [] };
    it('creates successfully', async () => {
      mockSave.mockResolvedValue(data);
      const res = await service.createRound(data);
      expect(mockSave).toHaveBeenCalled();
      expect(res).toBe(data);
    });

    it('throws on save failure', async () => {
      mockSave.mockRejectedValue(new Error('fail'));
      await expect(service.createRound(data)).rejects.toThrow('Error while Creating round');
    });
  });
});
