import { configureStore } from "@reduxjs/toolkit";
import { cinemaApi } from "../services/cinema/api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { filmApi } from "../services/film/api";


export const store = configureStore({
    reducer: {
        [cinemaApi.reducerPath] : cinemaApi.reducer,
        [filmApi.reducerPath] : filmApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cinemaApi.middleware, filmApi.middleware)
})

setupListeners(store.dispatch)