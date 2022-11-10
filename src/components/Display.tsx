import { ReactElement } from 'react';

interface DisplayProps {
  equation: string;
  result: string;
}

const Display = ({ equation, result }: DisplayProps): ReactElement => {
  return (
    <div className="input">
      {result ? <span className="result">{result} =</span> : ''}&nbsp;
      <span className="equation" data-testid="equation">{equation || '0'}</span>
    </div>
  );
};

export default Display;
