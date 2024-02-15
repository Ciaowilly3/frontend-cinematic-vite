import { renderHook } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import useVerifyTokenExpired from './useVerifyTokenExpired';

jest.mock('../store/store');
jest.mock('react-redux');
const mockedUseDispatch = jest.mocked(useDispatch);
const mockedUseSelector = jest.mocked(useSelector);

const mockedDispatch = jest.fn();

const hookRender = () => renderHook(() => useVerifyTokenExpired());

describe('useVerifyTokenExpired', () => {
  beforeEach(() => {
    mockedUseDispatch.mockReturnValue(mockedDispatch);
  });
  test('verify that token is not expired and perxists in store', () => {
    const mockedToken = {
      token: 'abc',
      expirationDate: (Date.now() + 1000).toString(),
    };
    mockedUseSelector.mockReturnValueOnce(mockedToken);
    const { result } = hookRender();
    result.current.verifyTokenExpired();

    expect(mockedDispatch).not.toHaveBeenCalled();
  });
  test('verify that token is  expired and not perxists in store', () => {
    const mockedToken = {
      token: 'abc',
      expirationDate: (Date.now() - 1000).toString(),
    };
    mockedUseSelector.mockReturnValueOnce(mockedToken);

    const { result } = hookRender();
    result.current.verifyTokenExpired();

    expect(mockedDispatch).toHaveBeenCalled();
  });
});
