import { FaArrowRight } from "react-icons/fa";
import PrimaryButton from "../PrimaryButton";
import { Link } from "react-router-dom";
import { PathsEnum } from "../../enums/priorityEnum";

interface SignInFormProps {
  handleModalVisibility: () => void;
}

const SignInForm = ({ handleModalVisibility }: SignInFormProps) => {
  return (
    <div className="SignIn-form">
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
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
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
            placeholder="Password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <input
            type="text"
            className="form-control"
            id="role"
            placeholder="Role"
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

export default SignInForm;
