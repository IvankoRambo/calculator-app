import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from '../App';

const getApiMock = (success: boolean, result?: string) => {
  return rest.put('/api/calculate', (req, res, ctx) => {
    return res(ctx.json({ success, result }));
  });
};

const server = setupServer(getApiMock(true));

describe('App Component', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should print number on digit click both for equation and preview part', async () => {
    server.use(getApiMock(true, '7'));

    render(<App />);

    userEvent.click(screen.getByRole('button', { name: '7' }));

    expect(await screen.findByText(/7 =/)).toBeInTheDocument();
    expect(screen.getByTestId('equation')).toHaveTextContent('7');
  });

  it('should calculate equations correctly', async () => {
    const equation = '2*2/4+6-1';
    const expectedResult = '6';

    server.use(getApiMock(true, '6'));

    const { asFragment } = render(<App />);

    userEvent.click(screen.getByRole('button', { name: '2' }));
    userEvent.click(screen.getByRole('button', { name: '*' }));
    userEvent.click(screen.getByRole('button', { name: '2' }));
    userEvent.click(screen.getByRole('button', { name: '/' }));
    userEvent.click(screen.getByRole('button', { name: '4' }));
    userEvent.click(screen.getByRole('button', { name: '+' }));
    userEvent.click(screen.getByRole('button', { name: '6' }));
    userEvent.click(screen.getByRole('button', { name: '-' }));
    userEvent.click(screen.getByRole('button', { name: '1' }));

    expect(await screen.findByText(new RegExp(`${expectedResult} =`))).toBeInTheDocument();
    expect(screen.getByTestId('equation')).toHaveTextContent(equation);

    userEvent.click(screen.getByRole('button', { name: '=' }));

    expect(await screen.findByTestId('equation')).toHaveTextContent(expectedResult);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not allow adding additional zero to original equation', () => {
    render(<App />);

    userEvent.click(screen.getByRole('button', { name: '0' }));
    userEvent.click(screen.getByRole('button', { name: '0' }));

    expect(screen.getByTestId('equation')).toHaveTextContent('0');
  });

  it('should not allow put operator as a first symbol of equation', () => {
    render(<App />);

    userEvent.click(screen.getByRole('button', { name: '+' }));

    expect(screen.getByTestId('equation')).toHaveTextContent('0');
  });

  it('should not allow put operator after another operator', () => {
    const equation = '3-1+';

    render(<App />);

    userEvent.click(screen.getByRole('button', { name: '3' }));
    userEvent.click(screen.getByRole('button', { name: '-' }));
    userEvent.click(screen.getByRole('button', { name: '1' }));
    userEvent.click(screen.getByRole('button', { name: '+' }));
    userEvent.click(screen.getByRole('button', { name: '/' }));

    expect(screen.getByTestId('equation')).toHaveTextContent(equation);
  });

  it('should not allow put double fraction operator for one number', () => {
    const equation = '34.35';

    render(<App />);

    userEvent.click(screen.getByRole('button', { name: '3' }));
    userEvent.click(screen.getByRole('button', { name: '4' }));
    userEvent.click(screen.getByRole('button', { name: '.' }));
    userEvent.click(screen.getByRole('button', { name: '3' }));
    userEvent.click(screen.getByRole('button', { name: '5' }));
    userEvent.click(screen.getByRole('button', { name: '.' }));

    expect(screen.getByTestId('equation')).toHaveTextContent(equation);
  });

  it('should not allow put double fraction operator for number in long equations', () => {
    const equation = '25/5+1.1+2+11.2';

    render(<App />);

    userEvent.click(screen.getByRole('button', { name: '2' }));
    userEvent.click(screen.getByRole('button', { name: '5' }));
    userEvent.click(screen.getByRole('button', { name: '/' }));
    userEvent.click(screen.getByRole('button', { name: '5' }));
    userEvent.click(screen.getByRole('button', { name: '+' }));
    userEvent.click(screen.getByRole('button', { name: '1' }));
    userEvent.click(screen.getByRole('button', { name: '.' }));
    userEvent.click(screen.getByRole('button', { name: '1' }));
    userEvent.click(screen.getByRole('button', { name: '+' }));
    userEvent.click(screen.getByRole('button', { name: '2' }));
    userEvent.click(screen.getByRole('button', { name: '+' }));
    userEvent.click(screen.getByRole('button', { name: '1' }));
    userEvent.click(screen.getByRole('button', { name: '1' }));
    userEvent.click(screen.getByRole('button', { name: '.' }));
    userEvent.click(screen.getByRole('button', { name: '2' }));
    userEvent.click(screen.getByRole('button', { name: '.' }));

    expect(screen.getByTestId('equation')).toHaveTextContent(equation);
  });

  it('should erase one symbol per one click on DEL button', async () => {
    const expectedEquation = '1+1';
    const expectedResult = '2';

    render(<App />);

    userEvent.click(screen.getByRole('button', { name: '1' }));

    server.use(getApiMock(true, '1'));

    userEvent.click(screen.getByRole('button', { name: '+' }));
    userEvent.click(screen.getByRole('button', { name: '1' }));

    server.use(getApiMock(true, '2'));

    userEvent.click(screen.getByRole('button', { name: '-' }));
    userEvent.click(screen.getByRole('button', { name: '2' }));

    server.use(getApiMock(true, '0'));

    userEvent.click(screen.getByRole('button', { name: 'DEL' }));
    userEvent.click(screen.getByRole('button', { name: 'DEL' }));

    server.use(getApiMock(true, expectedResult));

    expect(await screen.findByText(new RegExp(`${expectedResult} =`))).toBeInTheDocument();
    expect(screen.getByTestId('equation')).toHaveTextContent(expectedEquation);
  });

  it('should erase all equation and preview result, when C button is clicked', async () => {
    render(<App />);

    userEvent.click(screen.getByRole('button', { name: '2' }));
    userEvent.click(screen.getByRole('button', { name: '+' }));
    userEvent.click(screen.getByRole('button', { name: '2' }));

    server.use(getApiMock(true, '4'));

    expect(await screen.findByText(/4 =/)).toBeInTheDocument();
    expect(screen.getByTestId('equation')).toHaveTextContent('2+2');

    userEvent.click(screen.getByRole('button', { name: 'C' }));

    server.use(getApiMock(true, ''));

    await waitFor(() => {
      expect(screen.queryByText(/4 =/)).not.toBeInTheDocument();
    });
    expect(screen.getByTestId('equation')).toHaveTextContent('0');
  });
});
