import { Outlet, useLocation } from "react-router-dom";

const PrivatePage = () => {
  const location = useLocation();
  const regex = /^\/private\/?$/;
  if (regex.test(location.pathname)) {
    return (
      <div>
        <div>PrivatePage </div>
      </div>
    );
  } else {
    return <Outlet></Outlet>;
  }
};

export default PrivatePage;
