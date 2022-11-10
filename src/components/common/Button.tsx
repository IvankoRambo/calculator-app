import { ReactElement, MouseEvent } from 'react';

interface ButtonProps {
  value: string;
  handler: (event: MouseEvent) => void;
  disabled: boolean;
  className?: string;
}

const Button = ({ value, handler, disabled, className = '' }: ButtonProps): ReactElement =>
  <button
    onClick={handler}
    disabled={disabled}
    className={className}>
    {value}
  </button>;

export default Button;
