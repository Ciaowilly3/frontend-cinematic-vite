import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { authTokenState } from '../../slices/auth/authTokenSlice';

const PrivatePage = () => {
  const token = useSelector(
    (state: { authToken: authTokenState }) => state.authToken
  );
  const navigate = useNavigate();
  useEffect(() => {
    token.token ? '' : navigate('/');
  }, [token]);
  const location = useLocation();
  const regex = /^\/private\/?$/;
  if (regex.test(location.pathname)) {
    return (
      <div>
        <div>PrivatePage </div>
      </div>
    );
  } else {
    return <Outlet></Outlet>;
  }
};

export default PrivatePage;
