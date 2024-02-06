import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils";
import {
  deleteFilmById,
  makeNewFilm,
  retrieveAllFilms,
  updateFilmById,
} from "./endpoints";
import { authTokenState } from "../../slices/auth/authTokenSlice";
import { RootState } from "../../store/store";

export const filmApi = createApi({
  tagTypes: ["films"],
  reducerPath: "filmsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const authToken: authTokenState = (getState() as RootState).authToken;
      console.log(authToken);

      authToken.token
        ? headers.set("authorization", `Bearer ${authToken.token}`)
        : "";
      return headers;
    },
  }),
  endpoints: () => ({}),
}).injectEndpoints({
  endpoints: (builder) => ({
    retrieveAllFilms: retrieveAllFilms(builder),
    makeNewFilm: makeNewFilm(builder),
    updateFilmById: updateFilmById(builder),
    deleteFilmById: deleteFilmById(builder),
  }),
});

export const {
  useRetrieveAllFilmsQuery,
  useMakeNewFilmMutation,
  useUpdateFilmByIdMutation,
  useDeleteFilmByIdMutation,
} = filmApi;
