import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import AboutUsPage from "../pages/AboutUsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import PrivatePage from "../pages/PrivatePage/PrivatePage";
import PrivateFilmsPage from "../pages/PrivateFilmsPage/PrivateFilmsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "*", element: <NotFoundPage /> },
      { path: "", element: <HomePage /> },
      { path: "AboutUs", element: <AboutUsPage /> },
      {
        path: "/private",
        element: <PrivatePage />,
        children: [{ path: "films", element: <PrivateFilmsPage /> }],
      },
    ],
  },
]);

//TODO: come annidare le rotte?

//TODO: fare chiamate post per i film
//TODO: fare la logica di mostrare form login e slice per token dopo
