import { Jwt } from "jsonwebtoken";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";

const PrivatePage = () => {
  const location = useLocation();
  const regex = /^\/private\/?$/;
  const authToken = useSelector((state: { authToken: Jwt }) => state.authToken);
  console.log(authToken);

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
