import { useEffect } from "react";
import MainLayout from "../../Layouts/MainLayout.tsx/MainLayout";

const PrivateFilmsPage = () => {
  useEffect(() => {
    console.log("abda");
  });
  return (
    <MainLayout>
      <div>PrivateFilmPage</div>
      <img src="not-found.svg" alt="" />
    </MainLayout>
  );
};

export default PrivateFilmsPage;
