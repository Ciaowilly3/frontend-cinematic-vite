import { FaArrowRight } from "react-icons/fa";
import PrimaryButton from "../PrimaryButton";
import { Link } from "react-router-dom";
import { PathsEnum } from "../../enums/PathsEnum";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { toggleFormModal } from "../../slices/auth/formModalSlice";
import { formFields, schema } from "./schema";

const LoginForm = () => {
  const dispatch = useDispatch();
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

  const onSubmit: SubmitHandler<formFields> = (data) => {
    console.log(data);
  };

  return (
    <div className="login-form">
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label
            htmlFor="username"
            title="must be longer than 3"
            className="form-label"
          >
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="username"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-danger">{`${errors.username.message}`}</p>
          )}
        </div>

        <div className="mb-3">
          <label
            htmlFor="password"
            title="must be longer than 8"
            className="form-label"
          >
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-danger">{`${errors.password.message}`}</p>
          )}
        </div>
        <input type="submit" value={"Login"} className="btn btn-primary" />
      </form>
    </div>
  );
};

export default LoginForm;
