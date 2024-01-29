import { configureStore } from "@reduxjs/toolkit";
import { cinemaApi } from "../services/cinema/api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { filmApi } from "../services/film/api";
import formModalSlice from "../slices/auth/formModalSlice";
import { loginApi } from "../services/auth/login/api";
import authTokenSlice from "../slices/auth/authTokenSlice";

export const store = configureStore({
  reducer: {
    [cinemaApi.reducerPath]: cinemaApi.reducer,
    [filmApi.reducerPath]: filmApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [formModalSlice.reducerPath]: formModalSlice.reducer,
    [authTokenSlice.reducerPath]: authTokenSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cinemaApi.middleware,
      filmApi.middleware,
      loginApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
