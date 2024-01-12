import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import AboutUsPage from "../pages/AboutUsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "AboutUs", element: <AboutUsPage /> },
    ],
  },
]);

//TODO: pagina con path asterisco per 404
//TODO: creare componenti per bottoni
//TODO: fare chiamate post per i film
//TODO: fare la logica di mostrare form login e slice per token dopo
