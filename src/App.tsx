import { Outlet } from "react-router-dom";
import "./App.css";
import { LoginFormModal } from "./components";
import { useSelector } from "react-redux";

const mountedStyle = {
  animation: "inAnimation 250ms ease-in",
};
const unmountedStyle = {
  animation: "outAnimation 250ms ease-out",
  animationFillMode: "forwards",
};

function App() {
  const isShownLoginForm = useSelector(
    (state: { formModal: boolean }) => state.formModal
  );

  return (
    <div className="App bg-my-secondary">
      {isShownLoginForm && (
        <div
          className="fade-in-element"
          style={isShownLoginForm ? mountedStyle : unmountedStyle}
        >
          <LoginFormModal />
        </div>
      )}
      <Outlet></Outlet>
    </div>
  );
}

export default App;
