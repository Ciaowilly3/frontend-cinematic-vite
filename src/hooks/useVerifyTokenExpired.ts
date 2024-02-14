import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { memorizeWebToken } from '../slices/auth/authTokenSlice';
import { useCallback } from 'react';

const useVerifyTokenExpired = () => {
  const dispatch = useDispatch();
  const authToken = useSelector((state: RootState) => state.authToken);

  const verifyTokenExpired = useCallback(() => {
    const { expirationDate } = authToken;
    if (expirationDate && parseInt(expirationDate) < Date.now()) {
      localStorage.removeItem('persist:authToken');
      dispatch(memorizeWebToken(''));
    }
  }, [authToken, dispatch]);

  return {
    verifyTokenExpired,
  };
};

export default useVerifyTokenExpired;
