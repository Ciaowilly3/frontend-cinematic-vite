import { FaArrowRight } from "react-icons/fa";
import PrimaryButton from "../PrimaryButton";
import { Link } from "react-router-dom";
import { PathsEnum } from "../../enums/PathsEnum";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { toggleFormModal } from "../../slices/auth/formModalSlice";
import { formFields, schema, signInFormFields } from "./schema";
import FormInput from "../FormInputs/FormInput";
import _ from "lodash";
import { useRegisterMutation } from "../../services/auth/login/api";
import { IRegisterUser } from "../../interfaces/IUser";

const SignInForm = () => {
  const dispatch = useDispatch();
  const [signin] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formFields>({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const onSubmit: SubmitHandler<formFields> = async (data) => {
    const newUser: IRegisterUser = {
      ...data,
      cinemaId: 1,
      role: "ROLE_USER",
    };
    await signin(newUser)
      .unwrap()
      .then((payload) => {
        console.log(payload);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="SignIn-form">
      <form method="POST" onSubmit={handleSubmit(onSubmit)}>
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
        <input type="submit" value={"Signin"} className="btn btn-primary" />
      </form>
    </div>
  );
};

export default SignInForm;
