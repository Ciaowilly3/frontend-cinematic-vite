import { FaTimes } from "react-icons/fa";
import LoginForm from "../LoginForm/LoginForm";
import PrimaryButton from "../PrimaryButton";
import "./LoginFormModal.css";

interface LoginFormModalProps {
  handleLoginFormVisibility: () => void;
}

const LoginFormModal = ({ handleLoginFormVisibility }: LoginFormModalProps) => {
  return (
    <div className="form-modal border-my-primary shadow-lg p-2 bg-my-secondary">
      <PrimaryButton
        onClickFunction={handleLoginFormVisibility}
        content={FaTimes}
        additionalContent={"close"}
        style="btn btn-danger"
        isFormSubmit={false}
      />
      <LoginForm />
    </div>
  );
};

export default LoginFormModal;
