const mockFind = jest.fn();
const mockFindById = jest.fn();

jest.mock('../../models/materialType.model', () => {
  const m = function() {};
  m.find = mockFind;
  m.findById = mockFindById;
  return m;
});

const service = require('../../services/materialTypes.service');

describe('materialTypes.service', () => {
  afterEach(() => jest.resetAllMocks());

  describe('getMaterialType', () => {
    it('returns material type', async () => {
      const obj = { title: 't' };
      mockFindById.mockResolvedValue(obj);
      const res = await service.getMaterialType('1');
      expect(res).toBe(obj);
    });

    it('throws on error', async () => {
      mockFindById.mockRejectedValue(new Error('fail'));
      await expect(service.getMaterialType('1')).rejects.toThrow('Error while Paginating materialType');
    });

    it('returns null when missing', async () => {
      mockFindById.mockResolvedValue(null);
      const res = await service.getMaterialType('1');
      expect(res).toBeNull();
    });
  });

  describe('getMaterialTypes', () => {
    it('returns list', async () => {
      mockFind.mockResolvedValue([{ title: 't' }]);
      const res = await service.getMaterialTypes();
      expect(res.length).toBe(1);
    });

    it('throws on failure', async () => {
      mockFind.mockRejectedValue(new Error('fail'));
      await expect(service.getMaterialTypes()).rejects.toThrow('Error while Paginating sports');
    });
  });
});
