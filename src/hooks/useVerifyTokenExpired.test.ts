import { renderHook } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import useVerifyTokenExpired from './useVerifyTokenExpired';
import { deleteWebToken } from '../slices/auth/authTokenSlice';

import { useNavigate } from 'react-router';

jest.mock('../store/store');
jest.mock('../slices/auth/authTokenSlice');
jest.mock('react-redux');
jest.mock('react-router');
const mockedUseDispatch = jest.mocked(useDispatch);
const mockedUseSelector = jest.mocked(useSelector);
const mockedUseNavigate = jest.mocked(useNavigate);
const mockedDeleteWebToken = jest.mocked(deleteWebToken);

const mockedDispatch = jest.fn();
const mockedNavigate = jest.fn();

const hookRender = () => renderHook(() => useVerifyTokenExpired());

describe('useVerifyTokenExpired', () => {
  beforeEach(() => {
    mockedUseDispatch.mockReturnValue(mockedDispatch);
    mockedUseNavigate.mockReturnValue(mockedNavigate);
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
    expect(mockedDeleteWebToken).not.toHaveBeenCalled();
    expect(mockedNavigate).not.toHaveBeenCalled();
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
    expect(mockedDeleteWebToken).toHaveBeenCalled();
    expect(mockedNavigate).toHaveBeenCalled();
  });
});
