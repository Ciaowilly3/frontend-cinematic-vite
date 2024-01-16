import { FaArrowRight } from "react-icons/fa";
import PrimaryButton from "../PrimaryButton";
import { Link } from "react-router-dom";
import { useCallback } from "react";
import { PathsEnum } from "../../enums/priorityEnum";

interface LoginFormProps {
  handleModalVisibility: () => void;
}

const LoginForm = ({ handleModalVisibility }: LoginFormProps) => {
  const handleSubmit = useCallback(() => {}, []);

  return (
    <div className="login-form">
      <form action="">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="username"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="password"
          />
        </div>
        <Link to={PathsEnum.PRIVATE}>
          <PrimaryButton
            content={FaArrowRight}
            additionalContent={"enter"}
            onClickFunction={handleModalVisibility}
            style="success"
            type={"submit"}
          ></PrimaryButton>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
