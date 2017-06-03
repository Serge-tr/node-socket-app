const expect = require('expect');
const {isJuveString} = require('./validation');

describe('isJuveString', () => {
  it('should reject non-string values', () => {
    let res = isJuveString(98);
    expect(res).toBe(false);
  });
  it('should reject only spaces string', () => {
    let res = isJuveString('   ');
    expect(res).toBe(false);
  });
  it('should allow right string', () => {
    let res = isJuveString('  Serge ');
    expect(res).toBe(true);
  });
});
