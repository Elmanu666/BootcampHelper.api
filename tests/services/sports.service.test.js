const mockFind = jest.fn();
const mockFindById = jest.fn();

jest.mock('../../models/sport.model', () => {
  const m = function() {};
  m.find = mockFind;
  m.findById = mockFindById;
  return m;
});

const service = require('../../services/sports.service');

describe('sports.service', () => {
  afterEach(() => jest.resetAllMocks());

  describe('getSport', () => {
    it('returns sport', async () => {
      const obj = { name: 's' };
      mockFindById.mockResolvedValue(obj);
      const res = await service.getSport('1');
      expect(res).toBe(obj);
    });

    it('throws on error', async () => {
      mockFindById.mockRejectedValue(new Error('fail'));
      await expect(service.getSport('1')).rejects.toThrow('Error while Paginating sport');
    });

    it('returns null when not found', async () => {
      mockFindById.mockResolvedValue(null);
      const res = await service.getSport('1');
      expect(res).toBeNull();
    });
  });

  describe('getSports', () => {
    it('returns list', async () => {
      mockFind.mockResolvedValue([{ name: 's' }]);
      const res = await service.getSports();
      expect(res.length).toBe(1);
    });

    it('throws on failure', async () => {
      mockFind.mockRejectedValue(new Error('fail'));
      await expect(service.getSports()).rejects.toThrow('Error while Paginating sports');
    });
  });
});
