import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import AboutUsPage from "../pages/AboutUsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import PrivatePage from "../pages/PrivatePage/PrivatePage";
import PrivateFilmsPage from "../pages/PrivateFilmsPage/PrivateFilmsPage";
import PrivateActors from "../pages/PrivateActors";
import PrivateMainLayout from "../Layouts/PrivateMainLayout";
import MainLayout from "../Layouts/MainLayout.tsx/MainLayout";
import { PathsEnum } from "../enums/PathsEnum";

export const router = createBrowserRouter([
  {
    path: PathsEnum.HOME,

    element: (
      <MainLayout>
        <App />
      </MainLayout>
    ),
    children: [
      {
        path: PathsEnum.NOT_FOUND,
        element: <NotFoundPage />,
      },
      {
        path: PathsEnum.HOME,
        element: <HomePage />,
      },
      {
        path: PathsEnum.ABOUT_US,
        element: <AboutUsPage />,
      },
      {
        path: PathsEnum.PRIVATE,
        element: (
          <PrivateMainLayout>
            <PrivatePage />
          </PrivateMainLayout>
        ),
        children: [
          {
            path: PathsEnum.PRIVATE_FILMS,
            element: <PrivateFilmsPage />,
          },
          {
            path: PathsEnum.PRIVATE_ACTORS,
            element: <PrivateActors />,
          },
        ],
      },
    ],
  },
]);
