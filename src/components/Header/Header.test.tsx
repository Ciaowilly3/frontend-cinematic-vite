import { MemoryRouter } from 'react-router';
import Header from '.';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { toggleFormModal } from '../../slices/auth/formModalSlice';

const mockedDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockedDispatch,
}));
jest.mock('../../slices/auth/formModalSlice', () => ({
  toggleFormModal: jest.fn(),
}));
const renderComponent = () =>
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
describe('Header', () => {
  test('renders component correctly', () => {
    const { getByTestId, getByText, container } = renderComponent();
    expect(getByTestId('header')).toBeInTheDocument();
    expect(getByText('About Us')).toBeInTheDocument();
    expect(container.querySelector('.btn-flush')).toBeInTheDocument();
  });
  test('dispatch is call on button click', async () => {
    const { container } = renderComponent();
    const btn = container.querySelector('.btn-flush');

    btn && fireEvent.click(btn);

    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalled();
      expect(toggleFormModal).toHaveBeenCalled();
    });
  });
});
