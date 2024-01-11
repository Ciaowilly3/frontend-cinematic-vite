import LoginForm from "../LoginForm/LoginForm";
import "./LoginFormModal.css";

interface LoginFormModalProps {
  handleLoginFormVisibility: () => void;
}

const LoginFormModal = ({ handleLoginFormVisibility }: LoginFormModalProps) => {
  return (
    <div className="form-modal">
      <button onClick={handleLoginFormVisibility}>abda</button>
      <LoginForm />
    </div>
  );
};

export default LoginFormModal;
