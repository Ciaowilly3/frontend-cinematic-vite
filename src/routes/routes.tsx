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

export const router = createBrowserRouter([
  {
    path: "/",

    element: (
      <MainLayout>
        <App />
      </MainLayout>
    ),
    children: [
      {
        path: "*",
        element: <NotFoundPage />,
      },
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "about-us",
        element: <AboutUsPage />,
      },
      {
        path: "/private",
        element: (
          <PrivateMainLayout>
            <PrivatePage />
          </PrivateMainLayout>
        ),
        children: [
          {
            path: "films",
            element: <PrivateFilmsPage />,
          },
          {
            path: "actors",
            element: <PrivateActors />,
          },
        ],
      },
    ],
  },
]);

//TODO: form login e register
//TODO: fare chiamate post per i film
//TODO: fare la logica di mostrare form login e slice per token dopo
