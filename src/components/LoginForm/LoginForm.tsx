import { FaArrowRight } from "react-icons/fa";
import PrimaryButton from "../PrimaryButton";
import { Link } from "react-router-dom";

interface LoginFormProps {
  handleLoginFormVisibility: () => void;
}

const LoginForm = ({ handleLoginFormVisibility }: LoginFormProps) => {
  return (
    <div className="login-form">
      <form action="">
        <h2 className="fw-bolder">Login</h2>
        <input type="text" className="form-control" />
        <Link to={"/private"}>
          <PrimaryButton
            content={FaArrowRight}
            additionalContent={"enter"}
            onClickFunction={handleLoginFormVisibility}
            style="success"
            type={"submit"}
          ></PrimaryButton>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
