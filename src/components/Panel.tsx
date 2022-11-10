import { ReactElement, MouseEvent } from 'react';
import Button from './common/Button';
import createDigitsLayout from '../utils/createDigitsLayout';

interface PanelProps {
  equationHandler: (event: MouseEvent) => void;
  resultHandler: () => void;
  deletionHandler: () => void;
  clearingHandler: () => void;
  disabled: boolean;
}

const Panel = ({
  equationHandler,
  resultHandler,
  deletionHandler,
  clearingHandler,
  disabled,
}: PanelProps): ReactElement => {
  return (
    <>
      <div className="operators">
        <Button disabled={disabled} value="/" handler={equationHandler} />
        <Button disabled={disabled} value="*" handler={equationHandler} />
        <Button disabled={disabled} value="-" handler={equationHandler} />
        <Button disabled={disabled} value="+" handler={equationHandler} />
        <Button disabled={disabled} value="DEL" handler={deletionHandler} />
        <Button disabled={disabled} value="C" handler={clearingHandler} />
      </div>
      <div className="digits">
        {createDigitsLayout(equationHandler, disabled)}
        <Button disabled={disabled} value="0" handler={equationHandler} />
        <Button disabled={disabled} value="." handler={equationHandler} />
        <Button disabled={disabled} value="=" handler={resultHandler} className="equal" />
      </div>
    </>
  );
}

export default Panel;
