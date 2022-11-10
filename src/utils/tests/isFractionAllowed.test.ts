import isFractionAllowed from "../isFractionAllowed";

describe('isFractionAllowed', () => {
  it('should be not allowed when equation is an empty string', () => {
    expect(isFractionAllowed('')).toBe(false);
  });

  it('should be allowed when equation is a digit without a fraction', () => {
    expect(isFractionAllowed('4')).toBe(true);
  });

  it('should be not allowed when equation is a digit with a fraction', () => {
    expect(isFractionAllowed('4.564')).toBe(false);
  });

  it('should be not allowed when equation is complex and last digit with a fraction', () => {
    expect(isFractionAllowed('45/5*5.5+1-12.534')).toBe(false);
  });

  it('should be allowed when equation is complex and last digit without a fraction', () => {
    expect(isFractionAllowed('10/2+5*5.2-1+34')).toBe(true);
  });
});
