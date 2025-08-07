const mockSave = jest.fn();
const mockFind = jest.fn();
const mockFindById = jest.fn();

jest.mock('../../models/exercise.model', () => {
  const m = function() { return { save: mockSave }; };
  m.find = mockFind;
  m.findById = mockFindById;
  return m;
});

const service = require('../../services/exercises.service');

describe('exercises.service', () => {
  afterEach(() => jest.resetAllMocks());

  describe('getExercise', () => {
    it('returns exercise', async () => {
      const obj = { title: 'pushup' };
      mockFindById.mockImplementation(() => ({
        populate: () => ({
          populate: () => ({
            populate: () => obj
          })
        })
      }));
      const res = await service.getExercise('1');
      expect(res).toBe(obj);
    });

    it('throws on error', async () => {
      mockFindById.mockImplementation(() => { throw new Error('fail'); });
      await expect(service.getExercise('1')).rejects.toThrow('Error while Paginating exercise');
    });

    it('returns null when not found', async () => {
      mockFindById.mockImplementation(() => ({
        populate: () => ({
          populate: () => ({
            populate: () => null
          })
        })
      }));
      const res = await service.getExercise('1');
      expect(res).toBeNull();
    });
  });

  describe('createExercise', () => {
    const data = { title: 'squat', media: {} };
    it('creates successfully', async () => {
      mockSave.mockResolvedValue(data);
      const res = await service.createExercise(data);
      expect(mockSave).toHaveBeenCalled();
      expect(res).toBe(data);
    });

    it('throws on save failure', async () => {
      mockSave.mockRejectedValue(new Error('fail'));
      await expect(service.createExercise(data)).rejects.toThrow('Error while Creating exercise');
    });
  });
});
