const mockSave = jest.fn();
const mockFind = jest.fn();
const mockFindById = jest.fn();

jest.mock('../../models/material.model', () => {
  const m = function() { return { save: mockSave }; };
  m.find = mockFind;
  m.findById = mockFindById;
  return m;
});

const service = require('../../services/materials.service');

describe('materials.service', () => {
  afterEach(() => jest.resetAllMocks());

  describe('getMaterials', () => {
    it('returns materials', async () => {
      mockFind.mockImplementation(() => ({ populate: () => [{ title: 'rope' }] }));
      const res = await service.getMaterials();
      expect(res[0].title).toBe('rope');
    });

    it('throws on error', async () => {
      mockFind.mockImplementation(() => { throw new Error('fail'); });
      await expect(service.getMaterials()).rejects.toThrow('Error while Paginating materials');
    });
  });

  describe('createMaterial', () => {
    const data = { title: 'ball' };
    it('creates successfully', async () => {
      mockSave.mockResolvedValue(data);
      const res = await service.createMaterial(data);
      expect(mockSave).toHaveBeenCalled();
      expect(res).toBe(data);
    });

    it('throws on save failure', async () => {
      mockSave.mockRejectedValue(new Error('fail'));
      await expect(service.createMaterial(data)).rejects.toThrow('Error while Creating material');
    });
  });

  describe('getMaterial', () => {
    it('returns one material', async () => {
      const obj = { title: 'mat' };
      mockFindById.mockImplementation(() => ({ populate: () => obj }));
      const res = await service.getMaterial('1');
      expect(res).toBe(obj);
    });

    it('throws on find error', async () => {
      mockFindById.mockImplementation(() => { throw new Error('fail'); });
      await expect(service.getMaterial('1')).rejects.toThrow('Error while Paginating sessions');
    });

    it('returns null when not found', async () => {
      mockFindById.mockImplementation(() => ({ populate: () => null }));
      const res = await service.getMaterial('1');
      expect(res).toBeNull();
    });
  });
});
