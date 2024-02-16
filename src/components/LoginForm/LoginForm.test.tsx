import { fireEvent, render, waitFor } from '@testing-library/react';
import LoginForm from '.';
import { useLoginMutation } from '../../services/auth/login/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleFormModal } from '../../slices/auth/formModalSlice';
import { memorizeWebToken } from '../../slices/auth/authTokenSlice';
import { PathsEnum } from '../../enums/PathsEnum';

jest.mock('../../services/auth/login/api');
const mockedUseLoginMutation = jest.mocked(useLoginMutation);
jest.mock('react-router-dom');
const mockedUseNavigate = jest.mocked(useNavigate);
jest.mock('react-redux');
const mockedUseDispatch = jest.mocked(useDispatch);
jest.mock('../../slices/auth/formModalSlice');
const mockedToggleLoginFormModal = jest.mocked(toggleFormModal);
jest.mock('../../slices/auth/authTokenSlice');
const mockedMemorizeWebToken = jest.mocked(memorizeWebToken);

const mockedLogin = jest.fn();
const mockedNavigate = jest.fn();
const mockedDispatch = jest.fn();

const mockedUnwrap = jest.fn();
const mockedThen = jest.fn();

const mockedToken = '123';
const mockedUser = {
  userName: 'Marco',
  password: 'password',
};
const renderComponent = () => render(<LoginForm />);

describe('LoginForm', () => {
  beforeEach(() => {
    mockedUseLoginMutation.mockReturnValue([
      mockedLogin,
      { isLoading: false, isError: false },
    ] as never);
    mockedUseNavigate.mockReturnValue(mockedNavigate);
    mockedUseDispatch.mockReturnValue(mockedDispatch);
    mockedToggleLoginFormModal.mockImplementation(jest.fn());
    mockedMemorizeWebToken.mockImplementation(jest.fn());
  });
  test('test if component renders correctly', () => {
    const { getByText, getByPlaceholderText } = renderComponent();

    expect(getByText('Login')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter your username')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter your password')).toBeInTheDocument();
  });
  test('test if loader renders correctly', async () => {
    const { getByTestId } = renderComponent();

    fireEvent.submit(getByTestId('login'));

    mockedUseLoginMutation.mockReturnValue([
      mockedLogin,
      { isLoading: true },
    ] as never);

    await waitFor(() => {
      expect(getByTestId('loader')).toBeInTheDocument();
    });
  });
  test('test if errors in input are shown', async () => {
    const { getByPlaceholderText, getByText } = renderComponent();
    const usernameInputElement = getByPlaceholderText(
      'Enter your username'
    ) as HTMLInputElement;
    const passwordInputElement = getByPlaceholderText(
      'Enter your password'
    ) as HTMLInputElement;

    fireEvent.change(usernameInputElement, {
      target: { value: mockedUser.userName.slice(1, 3) },
    });
    fireEvent.focusOut(usernameInputElement);
    fireEvent.change(passwordInputElement, {
      target: { value: mockedUser.password.slice(1, 3) },
    });
    fireEvent.focusOut(passwordInputElement);
    await waitFor(() => {
      expect(getByText('at least 3 chars for username')).toBeInTheDocument();
      expect(
        getByText('Password must have at least 8 chars')
      ).toBeInTheDocument();
    });
  });
  test('test if submit functions works when ther is no error', async () => {
    const { getByTestId, getByPlaceholderText } = renderComponent();
    const usernameInputElement = getByPlaceholderText(
      'Enter your username'
    ) as HTMLInputElement;
    const passwordInputElement = getByPlaceholderText(
      'Enter your password'
    ) as HTMLInputElement;

    fireEvent.change(usernameInputElement, {
      target: { value: mockedUser.userName },
    });
    fireEvent.change(passwordInputElement, {
      target: { value: mockedUser.password },
    });
    fireEvent.submit(getByTestId('login'));

    mockedLogin.mockReturnValueOnce({
      unwrap: mockedUnwrap.mockResolvedValue({
        then: mockedThen.mockImplementation((callback) => {
          const payload = { token: mockedToken };
          callback(payload);
        }),
      }),
    });

    await waitFor(async () => {
      expect(mockedLogin).toHaveBeenCalledWith(mockedUser);
      expect(mockedUnwrap).toHaveBeenCalled();
      expect(mockedDispatch).toHaveBeenCalledTimes(2);
      expect(mockedToggleLoginFormModal).toHaveBeenCalled();
      expect(mockedMemorizeWebToken).toHaveBeenCalledWith(mockedToken);
      expect(mockedNavigate).toHaveBeenCalledWith(PathsEnum.PRIVATE);
    });
  });
  test('test if error displays when there is an error', async () => {
    const { getByTestId, getByText, getByPlaceholderText } = renderComponent();
    const usernameInputElement = getByPlaceholderText(
      'Enter your username'
    ) as HTMLInputElement;
    const passwordInputElement = getByPlaceholderText(
      'Enter your password'
    ) as HTMLInputElement;

    fireEvent.change(usernameInputElement, {
      target: { value: mockedUser.userName },
    });
    fireEvent.change(passwordInputElement, {
      target: { value: mockedUser.password },
    });

    fireEvent.submit(getByTestId('login'));

    mockedLogin.mockReturnValue({
      unwrap: mockedUnwrap.mockRejectedValue({
        then: mockedThen,
      }),
    });
    mockedUseLoginMutation.mockReturnValue([
      mockedLogin,
      { isError: true },
    ] as never);

    await waitFor(() => {
      expect(getByText('Error occured in Login')).toBeInTheDocument();
    });
  });
});
