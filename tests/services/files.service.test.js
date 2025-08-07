const mockSave = jest.fn();
const mockPaginate = jest.fn();

jest.mock('../../models/file.model', () => {
  const m = function() { return { save: mockSave }; };
  m.paginate = mockPaginate;
  return m;
});

const service = require('../../services/files.service');

describe('files.service', () => {
  afterEach(() => jest.resetAllMocks());

  describe('getFiles', () => {
    it('returns files', async () => {
      const files = [{ name: 'a' }];
      mockPaginate.mockResolvedValue(files);
      const res = await service.getFiles({}, 1, 10);
      expect(mockPaginate).toHaveBeenCalled();
      expect(res).toBe(files);
    });

    it('throws on error', async () => {
      mockPaginate.mockRejectedValue(new Error('fail'));
      await expect(service.getFiles({}, 1, 10)).rejects.toThrow('Error while Paginating files');
    });

    it('handles empty', async () => {
      mockPaginate.mockResolvedValue([]);
      const res = await service.getFiles({}, 1, 10);
      expect(res).toEqual([]);
    });
  });

  describe('createFile', () => {
    const data = { originalname: 'a' };
    it('creates successfully', async () => {
      mockSave.mockResolvedValue(data);
      const res = await service.createFile(data);
      expect(mockSave).toHaveBeenCalled();
      expect(res).toBe(data);
    });

    it('throws on save failure', async () => {
      mockSave.mockRejectedValue(new Error('fail'));
      await expect(service.createFile(data)).rejects.toThrow('Error while Creating exercise');
    });
  });
});
