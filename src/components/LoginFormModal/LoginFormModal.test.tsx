import { fireEvent, render, waitFor } from '@testing-library/react';
import { toggleFormModal } from '../../slices/auth/formModalSlice';
import LoginFormModal from '.';
import LoginForm from '../LoginForm';
import SignInForm from '../SignInForm';

const mokcedDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mokcedDispatch,
}));
jest.mock('../../slices/auth/formModalSlice');
const mockedToggleFormModal = jest.mocked(toggleFormModal);

jest.mock('../LoginForm', () => jest.fn());
jest.mock('../SignInForm', () => jest.fn());

const renderComponent = () => render(<LoginFormModal />);

describe('LoginFormModal', () => {
  test('test if component renders correctly', () => {
    const { getByText } = renderComponent();

    expect(getByText('Login')).toBeInTheDocument();
    expect(getByText('Sign-in')).toBeInTheDocument();
  });
  test('test if click x button closes form', async () => {
    const { container } = renderComponent();

    const closeBtn = container.querySelector(
      '.btn.btn-danger.rounded.rounded-circle'
    );

    closeBtn ? fireEvent.click(closeBtn) : '';

    await waitFor(() => {
      expect(mockedToggleFormModal).toHaveBeenCalled();
    });
  });
  test('test if component switches form', async () => {
    const { getByText } = renderComponent();

    fireEvent.click(getByText('Sign-in'));

    await waitFor(() => {
      expect(SignInForm).toHaveBeenCalledTimes(1);
    });

    fireEvent.click(getByText('Login'));

    await waitFor(() => {
      expect(LoginForm).toHaveBeenCalled();
    });
  });
});
