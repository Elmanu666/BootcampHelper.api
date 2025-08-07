const mockSave = jest.fn();
const mockFind = jest.fn();
const mockFindById = jest.fn();
const mockRemove = jest.fn();

jest.mock('../../models/user.model', () => {
  const m = function() { return { save: mockSave }; };
  m.find = mockFind;
  m.findById = mockFindById;
  m.remove = mockRemove;
  return m;
});

const service = require('../../services/users.service');

describe('users.service', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getUsers', () => {
    it('returns users without passwords', async () => {
      mockFind.mockResolvedValue([{ username: 'a', password: 'secret' }]);
      const res = await service.getUsers();
      expect(mockFind).toHaveBeenCalled();
      expect(res[0].password).toBe('');
    });

    it('throws error on failure', async () => {
      mockFind.mockRejectedValue(new Error('fail'));
      await expect(service.getUsers()).rejects.toThrow('Error while Paginating users');
    });

    it('handles empty list', async () => {
      mockFind.mockResolvedValue([]);
      const res = await service.getUsers();
      expect(res).toEqual([]);
    });
  });

  describe('createUser', () => {
    const userData = { username: 'b', password: 'x' };

    it('creates user successfully', async () => {
      mockSave.mockResolvedValue(userData);
      const res = await service.createUser(userData);
      expect(mockSave).toHaveBeenCalled();
      expect(res).toEqual(userData);
    });

    it('throws error on save failure', async () => {
      mockSave.mockRejectedValue(new Error('fail'));
      await expect(service.createUser(userData)).rejects.toThrow('Error while Creating user');
    });
  });
});
