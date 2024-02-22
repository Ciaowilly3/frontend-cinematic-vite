import { render, waitFor } from '@testing-library/react';
import PrivatePage from '.';

const mockedToken = jest.fn().mockReturnValue({ token: '123' });
jest.mock('react-redux', () => ({
  useSelector: () => jest.fn().mockReturnValue(mockedToken()),
}));
const mockedNavigate = jest.fn();
const mockedLocation = jest.fn().mockReturnValue({ pathname: '/private' });
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockedNavigate,
  useLocation: () => mockedLocation(),
  Outlet: jest.fn().mockReturnValue(<div>Outlet</div>),
}));
const renderComponent = () => render(<PrivatePage />);

describe('PrivatePage', () => {
  test('page renders correctly', () => {
    const { getByText } = renderComponent();
    expect(getByText('PrivatePage')).toBeInTheDocument();
  });
  test('authentication redirect in homePage if there is no token', async () => {
    mockedToken.mockReturnValueOnce({ token: '' });
    renderComponent();

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/');
    });
  });
  test('when ther is a different pathname returns the outlet', async () => {
    mockedLocation.mockReturnValueOnce({ pathname: '/private-Actors' });
    const { getByText } = renderComponent();

    await waitFor(() => {
      expect(getByText('Outlet')).toBeInTheDocument();
    });
  });
});
