import { Link, Outlet, useLocation } from "react-router-dom";
import MainLayout from "../../Layouts/MainLayout.tsx/MainLayout";
import { useEffect } from "react";

const PrivatePage = () => {
  const location = useLocation();
  const regex = /^\/private\/?$/;

  useEffect(() => {
    console.log(location.pathname);
    console.log(regex.test(location.pathname));
  }, [location.pathname]);

  if (regex.test(location.pathname)) {
    return (
      <div>
        <MainLayout>
          <div>PrivatePage </div>
        </MainLayout>
      </div>
    );
  } else {
    return <Outlet></Outlet>;
  }
};

export default PrivatePage;
