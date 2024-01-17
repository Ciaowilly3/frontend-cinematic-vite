import { FaArrowRight } from "react-icons/fa";
import PrimaryButton from "../PrimaryButton";
import { Link } from "react-router-dom";
import { PathsEnum } from "../../enums/priorityEnum";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { toggleFormModal } from "../../slices/auth/formModalSlice";

const schema = z
  .object({
    username: z.string().min(3, { message: "username must be 3 chars long" }),
    email: z.string().email({ message: "must be a valid email" }),
    password: z.string().min(8, { message: "password must be 8 chars long" }),
    confirmPassword: z.string().min(8),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        message: "password must match",
        code: z.ZodIssueCode.custom,
        path: ["confirmPassword"],
      });
    }
  });

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
          {errors.username && <p>{`${errors.username.message}`}</p>}
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
          {errors.email && <p>{`${errors.email.message}`}</p>}
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
          {errors.password && <p>{`${errors.password.message}`}</p>}
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
            <p>{`${errors.confirmPassword.message}`}</p>
          )}
        </div>
        <input type="submit" />
        <Link to={PathsEnum.PRIVATE}>
          <PrimaryButton
            icon={FaArrowRight}
            content={"Entra"}
            onClickFunction={() => dispatch(toggleFormModal())}
            style={["success"]}
            type={"submit"}
          ></PrimaryButton>
        </Link>
      </form>
    </div>
  );
};

export default SignInForm;
