import { useDispatch, useSelector } from 'react-redux';
import { authTokenState, deleteWebToken } from '../slices/auth/authTokenSlice';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';

const useVerifyTokenExpired = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authToken = useSelector(
    (state: { authToken: authTokenState }) => state.authToken
  );

  const verifyTokenExpired = useCallback(() => {
    const { expirationDate } = authToken;
    console.log(authToken + ' e invece ora ' + Date.now());
    if (expirationDate && parseInt(expirationDate) < Date.now()) {
      localStorage.removeItem('persist:authToken');
      dispatch(deleteWebToken());
      navigate('/');
    }
  }, [dispatch]);

  return {
    verifyTokenExpired,
  };
};

export default useVerifyTokenExpired;
