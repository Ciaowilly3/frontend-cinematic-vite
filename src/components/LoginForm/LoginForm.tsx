import { FaArrowRight } from "react-icons/fa";
import PrimaryButton from "../PrimaryButton";
import { Link } from "react-router-dom";
import { PathsEnum } from "../../enums/PathsEnum";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { toggleFormModal } from "../../slices/auth/formModalSlice";

const schema = z.object({
  username: z.string().min(3, { message: "at least 3 chars for username" }),
  password: z.string().min(8, "Password must have at least 8 chars"),
});

const LoginForm = () => {
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
    <div className="login-form">
      <form action="" onSubmit={handleSubmit((data) => console.log(data))}>
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
        <input type="submit" />
        <Link to={PathsEnum.PRIVATE}>
          <PrimaryButton
            icon={FaArrowRight}
            content={"enter"}
            onClickFunction={() => dispatch(toggleFormModal())}
            style={["btnSuccess"]}
            type={"submit"}
          ></PrimaryButton>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
