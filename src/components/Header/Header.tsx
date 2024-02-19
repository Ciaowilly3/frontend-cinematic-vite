import { FaUser } from 'react-icons/fa';
import cinematicLogo from '/cinematic-logo.png';
import './Header.css';
import { Link } from 'react-router-dom';
import { PathsEnum } from '../../enums/PathsEnum';
import { useDispatch } from 'react-redux';
import { toggleFormModal } from '../../slices/auth/formModalSlice';
import PrimaryLink from '../PrimaryLink';
import { PrimaryButton } from '..';

const Header = () => {
  const dispatch = useDispatch();
  return (
    <header data-testid="header" className="bg-my-primary container-fluid">
      <div className="row">
        <div className="col-4">
          <div className="nav-container text-white d-flex justify-content-center align-items-center h-100 gap-3">
            <PrimaryLink
              path={PathsEnum.ABOUT_US}
              style={['txtMyThird', 'linkFlush']}
              content="About Us"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="logo-container w-100">
            <Link to={'/'}>
              <img src={cinematicLogo} alt="logo" />
            </Link>
          </div>
        </div>
        <div className="col-4">
          <div className="icon-container text-white d-flex justify-content-center align-items-center h-100 gap-3 ">
            <PrimaryButton
              type="button"
              style={['txtMySecondary', 'btnFlush']}
              icon={FaUser}
              onClickFunction={() => dispatch(toggleFormModal())}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
