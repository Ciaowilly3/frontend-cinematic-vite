import { useCallback, useState } from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import LoginFormModal from "../LoginFormModal";
import cinematicLogo from "/cinematic-logo.png";
import "./Header.css";
import { Link } from "react-router-dom";
import { PathsEnum } from "../../enums/priorityEnum";

const mountedStyle = {
  animation: "inAnimation 250ms ease-in",
};
const unmountedStyle = {
  animation: "outAnimation 250ms ease-out",
  animationFillMode: "forwards",
};

const Header = () => {
  const [isShownLogInForm, setIsShownLogInForm] = useState(false);

  const handleLoginFormVisibility = useCallback(() => {
    setIsShownLogInForm(!isShownLogInForm);
  }, [isShownLogInForm]);
  return (
    <div data-testid="header" className="bg-my-primary container-fluid">
      {isShownLogInForm && (
        <div
          className="fade-in-element"
          style={isShownLogInForm ? mountedStyle : unmountedStyle}
        >
          <LoginFormModal handleModalVisibility={handleLoginFormVisibility} />
        </div>
      )}

      <div className="row">
        <div className="col-4">
          <div className="nav-container text-white d-flex justify-content-center align-items-center h-100 gap-3">
            <Link
              to={PathsEnum.ABOUT_US}
              className="link-flush link-third text-my-secondary"
            >
              nav
            </Link>
          </div>
        </div>
        <div className="col-4">
          <div className="logo-container w-100">
            <Link to={"/"}>
              <img src={cinematicLogo} alt="logo" />
            </Link>
          </div>
        </div>
        <div className="col-4">
          <div className="icon-container text-white d-flex justify-content-center align-items-center h-100 gap-3 ">
            <button
              type="button"
              className="btn-flush btn-third text-my-secondary"
              onClick={handleLoginFormVisibility}
            >
              <FaUser />
            </button>
            <button
              type="button"
              className="btn-flush btn-third text-my-secondary"
              onClick={handleLoginFormVisibility}
            >
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
