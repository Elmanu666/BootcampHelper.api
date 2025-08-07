const service = require('../../services/date.service');

describe('date.service', () => {
  it('converts string to date with defaults', () => {
    const d = service.stringToDate('2023-05-06');
    expect(d.getUTCFullYear()).toBe(2023);
    expect(d.getUTCHours()).toBe(0);
  });

  it('converts string with time', () => {
    const d = service.stringToDate('2023-05-06T07:08:09');
    expect(d.getUTCHours()).toBe(7);
    expect(d.getUTCMinutes()).toBe(8);
    expect(d.getUTCSeconds()).toBe(9);
  });

  it('handles empty string', () => {
    const d = service.stringToDate('');
    expect(isNaN(d.getTime())).toBe(false);
  });
});
