import "bootstrap/dist/css/bootstrap.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { persistore, store } from "./store/store";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistore}>
      <RouterProvider router={router}></RouterProvider>
    </PersistGate>
  </Provider>
);
