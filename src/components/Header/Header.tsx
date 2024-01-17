import { FaSearch, FaUser } from "react-icons/fa";
import cinematicLogo from "/cinematic-logo.png";
import "./Header.css";
import { Link } from "react-router-dom";
import { PathsEnum } from "../../enums/priorityEnum";
import { useDispatch } from "react-redux";
import { toggleFormModal } from "../../slices/auth/formModalSlice";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <div data-testid="header" className="bg-my-primary container-fluid">
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
              onClick={() => dispatch(toggleFormModal())}
            >
              <FaUser />
            </button>
            <button
              type="button"
              className="btn-flush btn-third text-my-secondary"
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
