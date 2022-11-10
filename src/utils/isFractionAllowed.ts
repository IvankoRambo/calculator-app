const isFractionAllowed = (value: string): boolean => {
  const separatorOperators = ['+', '-', '/', '*'];
  const fractionOperator = '.';
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

    if (lastDigit.indexOf(fractionOperator) !== -1) {
      allowed = false;
    }
  } else {
    allowed = false;
  }

  return allowed;
};

export default isFractionAllowed;
