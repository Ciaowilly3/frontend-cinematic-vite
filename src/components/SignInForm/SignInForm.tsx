import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { toggleFormModal } from '../../slices/auth/formModalSlice';
import { formFields, schema, signInFormFields } from './schema';
import FormInput from '../FormInputs/FormInput';
import _ from 'lodash';
import { useRegisterMutation } from '../../services/auth/login/api';
import { IRegisterUser } from '../../interfaces/IUser';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PathsEnum } from '../../enums/PathsEnum';
import { memorizeWebToken } from '../../slices/auth/authTokenSlice';
import MainLoader from '../MainLoader';

const SignInForm = React.memo(() => {
  const dispatch = useDispatch();
  const [signin, { isError, isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formFields>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    shouldFocusError: true,
  });

  const onSubmit: SubmitHandler<formFields> = async (data) => {
    const newUser: IRegisterUser = {
      ...data,
      cinemaId: 1,
      role: 'ROLE_USER',
    };
    await signin(newUser)
      .unwrap()
      .then((payload) => {
        console.log(payload);
        navigate(PathsEnum.PRIVATE);
        dispatch(memorizeWebToken(payload.token));
        dispatch(toggleFormModal());
      });
  };

  return (
    <div className="SignIn-form">
      {isLoading ? (
        <MainLoader />
      ) : (
        <form method="POST" onSubmit={handleSubmit(onSubmit)}>
          <div>
            {signInFormFields.map((field) => (
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
            {isError ? <p className="text-danger">an error occured</p> : ''}
          </div>
          <input
            type="submit"
            value={'Signin'}
            className="btn btn-primary"
            data-testid="signin"
          />
        </form>
      )}
    </div>
  );
});
export default SignInForm;
