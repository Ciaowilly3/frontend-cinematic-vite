import { FaArrowRight } from "react-icons/fa";
import PrimaryButton from "../PrimaryButton";
import { Link } from "react-router-dom";
import { PathsEnum } from "../../enums/PathsEnum";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { toggleFormModal } from "../../slices/auth/formModalSlice";
import { schema } from "./schema";

const SignInForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  return (
    <div className="SignIn-form">
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Username"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-danger">{`${errors.username.message}`}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-danger">{`${errors.email.message}`}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-danger">{`${errors.password.message}`}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="confirm-password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirm-password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-danger">{`${errors.confirmPassword.message}`}</p>
          )}
        </div>
        <input type="submit" />
        <Link to={PathsEnum.PRIVATE}>
          <PrimaryButton
            icon={FaArrowRight}
            content={"Entra"}
            onClickFunction={() => dispatch(toggleFormModal())}
            style={["btnSuccess"]}
            type={"submit"}
          ></PrimaryButton>
        </Link>
      </form>
    </div>
  );
};

export default SignInForm;
