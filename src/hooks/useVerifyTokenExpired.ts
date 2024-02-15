import { useDispatch, useSelector } from 'react-redux';
import { authTokenState, deleteWebToken } from '../slices/auth/authTokenSlice';
import { useCallback } from 'react';

const useVerifyTokenExpired = () => {
  const dispatch = useDispatch();
  const authToken = useSelector((state: authTokenState) => state);

  const verifyTokenExpired = useCallback(() => {
    const { expirationDate } = authToken;
    console.log(authToken.expirationDate + ' e invece ora ' + Date.now());
    if (expirationDate && parseInt(expirationDate) < Date.now()) {
      localStorage.removeItem('persist:authToken');
      dispatch(deleteWebToken());
    }
  }, [dispatch]);

  return {
    verifyTokenExpired,
  };
};

export default useVerifyTokenExpired;
