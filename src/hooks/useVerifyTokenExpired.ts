import { useDispatch } from 'react-redux';
import {
  authTokenState,
  memorizeWebToken,
} from '../slices/auth/authTokenSlice';
import { useCallback } from 'react';

const useVerifyTokenExpired = (authToken: authTokenState) => {
  const dispatch = useDispatch();

  const verifyTokenExpired = useCallback(() => {
    const { expirationDate } = authToken;
    console.log(authToken + ' e invece ora ' + Date.now());
    if (expirationDate && parseInt(expirationDate) < Date.now()) {
      localStorage.removeItem('persist:authToken');
      dispatch(memorizeWebToken(''));
    }
  }, [dispatch, authToken]);

  return {
    verifyTokenExpired,
  };
};

export default useVerifyTokenExpired;
