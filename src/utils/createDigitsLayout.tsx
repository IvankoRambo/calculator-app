import { MouseEvent } from 'react';
import Button from '../components/common/Button';

const createDigitsLayout = (
  handler: (event: MouseEvent) => void,
  disabled: boolean
): JSX.Element[] => {
  const digits: JSX.Element[] = [];

  for (let i = 1; i < 10; i++) {
    digits.push(<Button disabled={disabled} key={i} handler={handler} value={i.toString()} />);
  }

  return digits;
};

export default createDigitsLayout;
