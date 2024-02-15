import { fireEvent, render, waitFor } from '@testing-library/react';
import LoginForm from '.';
import { useLoginMutation } from '../../services/auth/login/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleFormModal } from '../../slices/auth/formModalSlice';
import { memorizeWebToken } from '../../slices/auth/authTokenSlice';

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

const mockedToken = '123';

const mockedLogin = jest.fn();
const mockedNavigate = jest.fn();
const mockedDispatch = jest.fn();

const mockedUnwrap = jest.fn();
const mockedThen = jest.fn();
const mockedCatch = jest.fn();

const renderComponent = () => render(<LoginForm />);

describe('LoginForm', () => {
  beforeEach(() => {
    mockedUseLoginMutation.mockReturnValue([mockedLogin] as never);
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
  test('test if errors in input are shown', async () => {
    const { getByPlaceholderText, getByText } = renderComponent();
    const usernameInputElement = getByPlaceholderText(
      'Enter your username'
    ) as HTMLInputElement;
    const passwordInputElement = getByPlaceholderText(
      'Enter your password'
    ) as HTMLInputElement;

    fireEvent.change(usernameInputElement, { target: { value: 'Ma' } });
    fireEvent.focusOut(usernameInputElement);
    fireEvent.change(passwordInputElement, { target: { value: 'pa' } });
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

    fireEvent.change(usernameInputElement, { target: { value: 'Marco' } });
    fireEvent.change(passwordInputElement, { target: { value: 'password' } });
    fireEvent.submit(getByTestId('login'));

    mockedLogin.mockReturnValueOnce({
      unwrap: mockedUnwrap.mockReturnValue({
        then: mockedThen.mockImplementation((callback) => {
          const payload = { token: mockedToken };
          callback(payload);
          return Promise.resolve(payload);
        }),
        catch: mockedCatch.mockImplementation((errorCallback) => {
          const error = new Error('Errore');
          errorCallback(error);
        }),
      }),
    });

    await waitFor(async () => {
      expect(mockedLogin).toHaveBeenCalledWith({
        userName: 'Marco',
        password: 'password',
      });
      await expect(mockedUnwrap).toHaveBeenCalled();
      await expect(mockedThen).toHaveBeenCalled();
      expect(mockedDispatch).toHaveBeenCalledTimes(2);
      expect(mockedToggleLoginFormModal).toHaveBeenCalled();
      expect(mockedMemorizeWebToken).toHaveBeenCalled();
      expect(mockedNavigate).toHaveBeenCalledWith('/private');
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

    fireEvent.change(usernameInputElement, { target: { value: 'Marco' } });
    fireEvent.change(passwordInputElement, { target: { value: 'password' } });

    fireEvent.submit(getByTestId('login'));

    mockedLogin.mockReturnValueOnce({
      unwrap: mockedUnwrap.mockRejectedValueOnce({
        then: mockedThen.mockImplementation((callback) => {
          const payload = { token: mockedToken };
          callback(payload);
        }),
        catch: mockedCatch.mockImplementation((errorCallback) => {
          const error = new Error('Errore simulato');
          errorCallback(error);
        }),
      }),
    });

    await waitFor(() => {
      expect(getByText('Error occured in Login')).toBeInTheDocument();
    });
  });
});
