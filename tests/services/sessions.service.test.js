const mockSave = jest.fn();
const mockFindById = jest.fn();
const mockPaginate = jest.fn();

jest.mock('../../models/session.model', () => {
  const m = function() { return { save: mockSave }; };
  m.findById = mockFindById;
  m.paginate = mockPaginate;
  return m;
});

const service = require('../../services/sessions.service');

describe('sessions.service', () => {
  afterEach(() => jest.resetAllMocks());

  describe('getSession', () => {
    it('returns session', async () => {
      const obj = { description: 's' };
      mockFindById.mockImplementation(() => ({
        populate: () => ({
          populate: () => ({
            populate: () => ({
              populate: () => obj
            })
          })
        })
      }));
      const res = await service.getSession('1');
      expect(res).toBe(obj);
    });

    it('throws on error', async () => {
      mockFindById.mockImplementation(() => { throw new Error('fail'); });
      await expect(service.getSession('1')).rejects.toThrow();
    });

    it('returns null when not found', async () => {
      mockFindById.mockImplementation(() => ({
        populate: () => ({
          populate: () => ({
            populate: () => ({
              populate: () => null
            })
          })
        })
      }));
      const res = await service.getSession('1');
      expect(res).toBeNull();
    });
  });

  describe('createSession', () => {
    const data = { description: 's' };
    it('creates successfully', async () => {
      mockSave.mockResolvedValue(data);
      const res = await service.createSession(data);
      expect(mockSave).toHaveBeenCalled();
      expect(res).toBe(data);
    });

    it('throws on save failure', async () => {
      mockSave.mockRejectedValue(new Error('fail'));
      await expect(service.createSession(data)).rejects.toThrow('Error while Creating session');
    });
  });
});
