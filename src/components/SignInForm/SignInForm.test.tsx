import { fireEvent, render, waitFor } from '@testing-library/react';
import SignInForm from '.';
import { toggleFormModal } from '../../slices/auth/formModalSlice';
import { memorizeWebToken } from '../../slices/auth/authTokenSlice';
import { PathsEnum } from '../../enums/PathsEnum';

const mockedSignin = jest.fn();
const mockedIsLoading = jest.fn().mockReturnValue(false);
const mockedIsError = jest.fn().mockReturnValue(false);
const mockedNavigate = jest.fn();
const mockedDispatch = jest.fn();
jest.mock('../../services/auth/login/api', () => ({
  useRegisterMutation: () => [
    mockedSignin,
    { isLoading: mockedIsLoading(), isError: mockedIsError() },
  ],
}));
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockedNavigate,
}));
jest.mock('react-redux', () => ({
  useDispatch: () => mockedDispatch,
}));
jest.mock('../../slices/auth/formModalSlice');
const mockedToggleFormModal = jest.mocked(toggleFormModal);
jest.mock('../../slices/auth/authTokenSlice');
const mockedMemorizeWebToken = jest.mocked(memorizeWebToken);

const mockedUnwrap = jest.fn();
const mockedThen = jest.fn();
const mockedToken = '123';
const mockedUser = {
  userName: 'Marco',
  email: 'marco@mail.it',
  password: 'password',
  confirmPassword: 'password',
};
const renderComponent = () => render(<SignInForm />);
describe('SignInForm', () => {
  beforeEach(() => {
    mockedToggleFormModal.mockImplementation(jest.fn());
    mockedMemorizeWebToken.mockImplementation(jest.fn());
  });
  test('test if component renders correctly', () => {
    const { getByText, getByPlaceholderText } = renderComponent();

    expect(getByText('Signin')).toBeInTheDocument();
    expect(getByPlaceholderText('Username')).toBeInTheDocument();
    expect(getByPlaceholderText('Email')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByPlaceholderText('Confirm Password')).toBeInTheDocument();
  });
  test('test if loader renders correctly', async () => {
    const { getByTestId } = renderComponent();

    fireEvent.submit(getByTestId('signin'));

    mockedIsLoading.mockReturnValueOnce(true);

    await waitFor(() => {
      expect(getByTestId('loader')).toBeInTheDocument();
    });
  });
  test('test if error displays when there is an error', async () => {
    const { getByTestId, getByText } = renderComponent();

    fireEvent.submit(getByTestId('signin'));

    mockedSignin.mockReturnValueOnce({
      unwrap: mockedUnwrap.mockRejectedValue({
        then: mockedThen.mockImplementation((callback) => {
          const payload = { token: mockedToken };
          callback(payload);
        }),
      }),
    });

    mockedIsError.mockReturnValueOnce(true);

    await waitFor(() => {
      expect(getByText('an error occured')).toBeInTheDocument();
    });
  });
  test('test if submit functions works when ther is no error', async () => {
    const { getByTestId, getByPlaceholderText } = renderComponent();
    const usernameInputElement = getByPlaceholderText(
      'Username'
    ) as HTMLInputElement;
    const emailInputElement = getByPlaceholderText('Email') as HTMLInputElement;
    const passwordInputElement = getByPlaceholderText(
      'Password'
    ) as HTMLInputElement;
    const confirmPasswordInputElement = getByPlaceholderText(
      'Confirm Password'
    ) as HTMLInputElement;

    fireEvent.change(usernameInputElement, {
      target: { value: mockedUser.userName },
    });
    fireEvent.change(emailInputElement, {
      target: { value: mockedUser.email },
    });
    fireEvent.change(passwordInputElement, {
      target: { value: mockedUser.password },
    });
    fireEvent.change(confirmPasswordInputElement, {
      target: { value: mockedUser.confirmPassword },
    });
    fireEvent.submit(getByTestId('signin'));

    mockedSignin.mockReturnValueOnce({
      unwrap: mockedUnwrap.mockResolvedValue({
        then: mockedThen.mockImplementation((callback) => {
          const payload = { token: mockedToken };
          callback(payload);
        }),
      }),
    });

    await waitFor(async () => {
      expect(mockedSignin).toHaveBeenCalledWith({
        ...mockedUser,
        cinemaId: 1,
        role: 'ROLE_USER',
      });
      expect(mockedUnwrap).toHaveBeenCalled();
      expect(mockedDispatch).toHaveBeenCalledTimes(2);
      expect(mockedToggleFormModal).toHaveBeenCalled();
      expect(mockedMemorizeWebToken).toHaveBeenCalledWith(mockedToken);
      expect(mockedNavigate).toHaveBeenCalledWith(PathsEnum.PRIVATE);
    });
  });
  test('test if  error displays for different password', async () => {
    const { getByTestId, getByPlaceholderText, getByText } = renderComponent();
    const usernameInputElement = getByPlaceholderText(
      'Username'
    ) as HTMLInputElement;
    const emailInputElement = getByPlaceholderText('Email') as HTMLInputElement;
    const passwordInputElement = getByPlaceholderText(
      'Password'
    ) as HTMLInputElement;
    const confirmPasswordInputElement = getByPlaceholderText(
      'Confirm Password'
    ) as HTMLInputElement;

    fireEvent.change(usernameInputElement, {
      target: { value: mockedUser.userName },
    });
    fireEvent.change(emailInputElement, {
      target: { value: mockedUser.email },
    });
    fireEvent.change(passwordInputElement, {
      target: { value: mockedUser.password },
    });
    fireEvent.change(confirmPasswordInputElement, {
      target: { value: mockedUser.confirmPassword + 's' },
    });

    fireEvent.submit(getByTestId('signin'));

    await waitFor(() => {
      expect(getByText('password must match')).toBeInTheDocument();
    });
  });
});
