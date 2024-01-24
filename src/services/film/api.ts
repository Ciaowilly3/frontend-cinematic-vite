import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils";
import {
  deleteFilmById,
  makeNewFilm,
  retrieveAllFilms,
  updateFilmById,
} from "./endpoints";

export const filmApi = createApi({
  tagTypes: ["films"],
  reducerPath: "filmsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
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
