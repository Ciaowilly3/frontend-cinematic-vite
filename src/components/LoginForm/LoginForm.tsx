import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formFields, loginFormFields, schema } from './schema';
import FormInput from '../FormInputs/FormInput';
import _ from 'lodash';
import { useLoginMutation } from '../../services/auth/login/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleFormModal } from '../../slices/auth/formModalSlice';
import { useCallback } from 'react';
import { memorizeWebToken } from '../../slices/auth/authTokenSlice';
import MainLoader from '../MainLoader';
import { PathsEnum } from '../../enums/PathsEnum';

const LoginForm = () => {
  const [login, { isError, isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formFields>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const onSubmit: SubmitHandler<formFields> = useCallback((data) => {
    login(data)
      .unwrap()
      .then((payload) => {
        dispatch(memorizeWebToken(payload.token));
        dispatch(toggleFormModal());
        navigate(PathsEnum.PRIVATE);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    <div className="login-form">
      <form method="POST" onSubmit={handleSubmit(onSubmit)}>
        {loginFormFields.map((field) => (
          <FormInput
            key={_.uniqueId()}
            type={field.type}
            style={field.style}
            id={field.id}
            placeholder={field.placeholder}
            label={field.label}
            error={errors[field.name]}
            register={register}
          />
        ))}
        {isError && <p className="text-danger">Error occured in Login</p>}
        <input
          type="submit"
          value={'Login'}
          className="btn btn-primary"
          data-testid="login"
        />
      </form>
    </div>
  );
};

export default LoginForm;
