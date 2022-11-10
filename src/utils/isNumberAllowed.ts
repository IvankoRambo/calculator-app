const isNumberAllowed = (value: string): boolean => {
  const separatorOperators = ['+', '-', '/', '*'];
  const zeroOperator = '0';
  let allowed = true;

  if (value) {
    const indexes: number[] = [];
    let lastDigit: string = value;

    separatorOperators.forEach((separatorOperator) => {
      indexes.push(value.lastIndexOf(separatorOperator));
    });

    const maxIndex = Math.max(...indexes);

    if (maxIndex !== -1) {
      lastDigit = lastDigit.substring(maxIndex + 1, value.length);
    }

    if (lastDigit.length === 1 && lastDigit === '0') {
      allowed = false;
    }
  }

  return allowed;
};

export default isNumberAllowed;
