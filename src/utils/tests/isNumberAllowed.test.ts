import isNumberAllowed from '../isNumberAllowed';

describe('isNumberAllowed', () => {
  it('should allow when equation is an empty string', () => {
    expect(isNumberAllowed('')).toBe(true);
  });

  it('should not allow when the string is 0', () => {
    expect(isNumberAllowed('0')).toBe(false);
  });

  it('should not allow when last digit is a 0 in equation', () => {
    expect(isNumberAllowed('4+3.2-0.1/2+0')).toBe(false);
  });

  it('should be allowed when the digit is more than 9', () => {
    expect(isNumberAllowed('4+3.2-0.1/2+50')).toBe(true);
  });

  it('should be allowed when last digit is 1 to 9', () => {
    expect(isNumberAllowed('0-1+2-5')).toBe(true);
  });
});
