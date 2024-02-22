import { renderHook } from '@testing-library/react';
import useVerifyTokenExpired from './useVerifyTokenExpired';
import { deleteWebToken } from '../slices/auth/authTokenSlice';

import { useNavigate } from 'react-router';

const mockedToken = jest.fn().mockReturnValue({
  token: 'abc',
  expirationDate: (Date.now() - 1000).toString(),
});
jest.mock('../store/store');
jest.mock('../slices/auth/authTokenSlice');
jest.mock('react-redux', () => ({
  useSelector: () => mockedToken(),
  useDispatch: () => mockedDispatch,
}));
jest.mock('react-router');
const mockedUseNavigate = jest.mocked(useNavigate);
const mockedDeleteWebToken = jest.mocked(deleteWebToken);

const mockedDispatch = jest.fn();
const mockedNavigate = jest.fn();

const hookRender = () => renderHook(() => useVerifyTokenExpired());

describe('useVerifyTokenExpired', () => {
  beforeEach(() => {
    mockedUseNavigate.mockReturnValue(mockedNavigate);
  });
  test('verify that token is not expired and perxists in store', () => {
    mockedToken.mockReturnValueOnce({
      token: 'abc',
      expirationDate: (Date.now() + 1000).toString(),
    });
    const { result } = hookRender();
    result.current.verifyTokenExpired();

    expect(mockedDispatch).not.toHaveBeenCalled();
    expect(mockedDeleteWebToken).not.toHaveBeenCalled();
    expect(mockedNavigate).not.toHaveBeenCalled();
  });
  test('verify that token is  expired and not perxists in store', () => {
    const { result } = hookRender();
    result.current.verifyTokenExpired();

    expect(mockedDispatch).toHaveBeenCalled();
    expect(mockedDeleteWebToken).toHaveBeenCalled();
    expect(mockedNavigate).toHaveBeenCalled();
  });
});
