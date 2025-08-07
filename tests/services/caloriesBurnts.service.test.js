const mockSave = jest.fn();
const mockFind = jest.fn();
const mockFindById = jest.fn();

jest.mock('../../models/caloriesBurnt.model', () => {
  const m = function() { return { save: mockSave }; };
  m.find = mockFind;
  m.findById = mockFindById;
  return m;
});

const service = require('../../services/caloriesBurnts.service');

describe('caloriesBurnts.service', () => {
  afterEach(() => jest.resetAllMocks());

  describe('getCaloriesBurnt', () => {
    it('returns a caloriesBurnt', async () => {
      const obj = { amount: 10 };
      mockFindById.mockImplementation(() => ({ populate: () => obj }));
      const res = await service.getCaloriesBurnt('1');
      expect(res).toBe(obj);
    });

    it('throws on failure', async () => {
      mockFindById.mockImplementation(() => { throw new Error('fail'); });
      await expect(service.getCaloriesBurnt('1')).rejects.toThrow('Error while Paginating caloriesBurnt');
    });

    it('returns null when not found', async () => {
      mockFindById.mockImplementation(() => ({ populate: () => null }));
      const res = await service.getCaloriesBurnt('1');
      expect(res).toBeNull();
    });
  });

  describe('createCaloriesBurnt', () => {
    const data = { amount: 5 };
    it('creates successfully', async () => {
      mockSave.mockResolvedValue(data);
      const res = await service.createCaloriesBurnt(data);
      expect(mockSave).toHaveBeenCalled();
      expect(res).toBe(data);
    });

    it('throws when save fails', async () => {
      mockSave.mockRejectedValue(new Error('fail'));
      await expect(service.createCaloriesBurnt(data)).rejects.toThrow('Error while Creating caloriesBurnt');
    });
  });
});
