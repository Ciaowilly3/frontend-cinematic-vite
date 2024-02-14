import { renderHook } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import useVerifyTokenExpired from './useVerifyTokenExpired';
import { authTokenState } from '../slices/auth/authTokenSlice';

jest.mock('../store/store');
jest.mock('react-redux');
const mockedUseDispatch = jest.mocked(useDispatch);

const hookRender = (mockedToken: authTokenState) =>
  renderHook(() => useVerifyTokenExpired(mockedToken));

describe('useVerifyTokenExpired', () => {
  beforeEach(() => {
    mockedUseDispatch.mockReturnValue(jest.fn());
  });
  test('verify that token is not expired and perxists in store', () => {
    const mockedToken = {
      token: 'abc',
      expirationDate: (Date.now() + 1000).toString(),
    };
    const { result } = hookRender(mockedToken);
    result.current.verifyTokenExpired();

    expect(mockedUseDispatch()).not.toHaveBeenCalled();
  });
  test('verify that token is  expired and not perxists in store', () => {
    const mockedToken = {
      token: 'abc',
      expirationDate: (Date.now() - 1000).toString(),
    };
    const { result } = hookRender(mockedToken);
    result.current.verifyTokenExpired();

    expect(mockedUseDispatch()).toHaveBeenCalled();
  });
});
