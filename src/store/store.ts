import { configureStore } from "@reduxjs/toolkit";
import { cinemaApi } from "../services/cinema/api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { filmApi } from "../services/film/api";
import formModalSlice from "../slices/auth/formModalSlice";
import { loginApi } from "../services/auth/login/api";

export const store = configureStore({
  reducer: {
    [cinemaApi.reducerPath]: cinemaApi.reducer,
    [filmApi.reducerPath]: filmApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [formModalSlice.reducerPath]: formModalSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cinemaApi.middleware,
      filmApi.middleware,
      loginApi.middleware
    ),
});

setupListeners(store.dispatch);
