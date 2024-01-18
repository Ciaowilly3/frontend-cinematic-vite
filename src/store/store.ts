import { configureStore } from "@reduxjs/toolkit";
import { cinemaApi } from "../services/cinema/api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { filmApi } from "../services/film/api";
import formModalSlice from "../slices/auth/formModalSlice";

export const store = configureStore({
  reducer: {
    [cinemaApi.reducerPath]: cinemaApi.reducer,
    [filmApi.reducerPath]: filmApi.reducer,
    [formModalSlice.reducerPath]: formModalSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cinemaApi.middleware, filmApi.middleware),
});

setupListeners(store.dispatch);
