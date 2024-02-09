import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { memorizeWebToken } from '../slices/auth/authTokenSlice';
import { useCallback } from 'react';

const useVerifyTokenExpired = () => {
  const dispatch = useDispatch();
  const authToken = useSelector((state: RootState) => state.authToken);

  const verifyTokenExpired = useCallback(() => {
    const { expirationDate } = authToken;
    console.log('espirazione : ' + expirationDate + ' ora : ' + Date.now());
    console.log(parseInt(expirationDate) < Date.now());

    if (expirationDate) {
      if (parseInt(expirationDate) < Date.now()) {
        console.log('è entrato?');

        localStorage.removeItem('persist:authToken');
        dispatch(memorizeWebToken(''));
      }
    }
  }, [authToken, dispatch]);

  return {
    verifyTokenExpired,
  };
};

export default useVerifyTokenExpired;
