import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cinemaApi } from "../services/cinema/api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { filmApi } from "../services/film/api";
import formModalSlice from "../slices/auth/formModalSlice";
import { loginApi } from "../services/auth/login/api";
import authTokenSlice, { authTokenState } from "../slices/auth/authTokenSlice";
import {
  persistStore,
  persistReducer,
  PersistConfig,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import hardSet from "redux-persist/es/stateReconciler/hardSet";
import { genresApi } from "../services/genre/api";

export type PersistedRootState = {
  authToken: typeof authTokenSlice;
};

const persistConfig: PersistConfig<authTokenState, any, any, any> = {
  version: 1,
  key: "authToken",
  storage: storage,
  whitelist: ["token", "expirationDate"],
  stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistConfig, authTokenSlice.reducer);

export const rootReducers = {
  [cinemaApi.reducerPath]: cinemaApi.reducer,
  [filmApi.reducerPath]: filmApi.reducer,
  [loginApi.reducerPath]: loginApi.reducer,
  [genresApi.reducerPath]: genresApi.reducer,
  [formModalSlice.reducerPath]: formModalSlice.reducer,
  [authTokenSlice.reducerPath]: persistedReducer,
};

export const store = configureStore({
  reducer: combineReducers(rootReducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      cinemaApi.middleware,
      filmApi.middleware,
      loginApi.middleware,
      genresApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;

export let persistore = persistStore(store);

setupListeners(store.dispatch);
