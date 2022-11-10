import { useState, MouseEvent } from 'react';
import Display from './components/Display';
import Panel from './components/Panel';
import { updateCalculation } from './utils/callApi';
import isFractionAllowed from './utils/isFractionAllowed';

function App() {
  const [equation, setEquation] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);

  const operators = ['/', '*', '-', '+', '.'];

  const handleequation = async (event: MouseEvent) => {
    const value = (event.target as HTMLButtonElement).textContent || '';

    if (
      value &&
      (
        value !== '0' ||
        equation
      ) &&
      (
        !operators.includes(value) ||
        (
          equation &&
          !operators.includes(equation.slice(-1)) &&
          !(value === '.' && !isFractionAllowed(equation))
        )
      )
    ) {
      setEquation(equation + value);

      if (!operators.includes(value)) {
        const { success, result: updatedResult } = await updateCalculation(equation + value);

        if (success) {
          setResult(updatedResult);
        }
      }
    }
  };

  const handleSummarisation = async () => {
    setDisabled(true);

    const { success, result: updatedResult } = await updateCalculation(equation);

    setDisabled(false);

    if (success && result != null) {
      setEquation(updatedResult.toString());
    }
  };

  const handleDeletion = async () => {
    if (equation) {
      const updatedEquation = equation.slice(0, -1);

      setEquation(updatedEquation);

      if (!operators.includes(updatedEquation.slice(-1))) {
        const { success, result: updatedResult } = await updateCalculation(updatedEquation);

        if (success) {
          setResult(updatedResult);
        }
      }
    }
  };

  const handleClearing = async () => {
    if (equation) {
      const updatedEquation = '';

      setEquation(updatedEquation);

      const { success, result: updatedResult } = await updateCalculation(updatedEquation);

      if (success) {
        setResult(updatedResult);
      }
    }
  };

  return (
    <div className="App">
      <div className="calculator">
        <Display equation={equation} result={result} />
        <Panel
          equationHandler={handleequation}
          resultHandler={handleSummarisation}
          deletionHandler={handleDeletion}
          clearingHandler={handleClearing}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

export default App;
