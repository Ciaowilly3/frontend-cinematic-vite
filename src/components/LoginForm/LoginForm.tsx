import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formFields, loginFormFields, schema } from "./schema";
import FormInput from "../FormInputs/FormInput";
import _ from "lodash";
import { useLoginMutation } from "../../services/auth/login/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleFormModal } from "../../slices/auth/formModalSlice";
import { useState } from "react";

const LoginForm = () => {
  const [loginError, setLoginError] = useState<any>(undefined);
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formFields>({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: false,
  });

  const onSubmit: SubmitHandler<formFields> = async (data) => {
    await login(data)
      .unwrap()
      .then((payload) => {
        console.log(payload);
        setLoginError(false);
        navigate("/private");
        dispatch(toggleFormModal());
      })
      .catch((e) => {
        console.log(e);
        setLoginError(e);
      });
  };

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
        {loginError && (
          <div>
            {loginError.status === 403 ? (
              <p className="text-danger">Password is incorrect</p>
            ) : (
              <p className="text-danger">username not found</p>
            )}
          </div>
        )}
        <input type="submit" value={"Login"} className="btn btn-primary" />
      </form>
    </div>
  );
};

export default LoginForm;
