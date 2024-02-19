import { FaTimes } from 'react-icons/fa';
import LoginForm from '../LoginForm';
import PrimaryButton from '../PrimaryButton';
import './LoginFormModal.css';
import { useCallback, useState } from 'react';
import SignInForm from '../SignInForm';
import { useDispatch } from 'react-redux';
import { toggleFormModal } from '../../slices/auth/formModalSlice';

const LoginFormModal = () => {
  const dispatch = useDispatch();
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleFormSwitch = useCallback(() => {
    setIsLoginForm((prev) => !prev);
  }, []);

  return (
    <div className="form-modal border-my-primary shadow-lg p-3 bg-my-secondary">
      <div className="text-end mb-3" data-testid="close">
        <PrimaryButton
          icon={FaTimes}
          style={['btnDanger', 'circle']}
          onClickFunction={() => dispatch(toggleFormModal())}
        />
      </div>
      <div className="d-flex justify-content-between">
        <h2
          className={`fw-bolder text-third-hover ${
            isLoginForm ? 'text-my-third' : 'text-my-primary'
          }`}
        >
          <PrimaryButton
            content={'Login'}
            style={['btnFlush']}
            onClickFunction={handleFormSwitch}
            disable={isLoginForm ? true : undefined}
          />
        </h2>
        <h2
          className={`fw-bolder text-third-hover ${
            isLoginForm ? 'text-my-primary' : 'text-my-third'
          }`}
        >
          <PrimaryButton
            content={'Sign-in'}
            style={['btnFlush']}
            onClickFunction={handleFormSwitch}
            disable={!isLoginForm ? true : undefined}
          />
        </h2>
      </div>
      {isLoginForm ? <LoginForm /> : <SignInForm />}
    </div>
  );
};

export default LoginFormModal;
