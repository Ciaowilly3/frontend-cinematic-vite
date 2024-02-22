import App from './App';
import { render, waitFor } from '@testing-library/react';

const mockedIsShownLoginForm = jest.fn().mockReturnValue(false);
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: () => mockedIsShownLoginForm(),
}));

jest.mock('./hooks/useVerifyTokenExpired', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({ verifyTokenExpired: jest.fn() }),
}));

jest.mock('./components/LoginFormModal', () =>
  jest.fn().mockReturnValue(<div>Login form</div>)
);

const renderComponent = () => render(<App />);

describe('App', () => {
  test('App component renders form correctly', async () => {
    mockedIsShownLoginForm.mockReturnValueOnce(true);
    const { getByText } = renderComponent();

    await waitFor(() => expect(getByText('Login form')).toBeInTheDocument());
  });
});
