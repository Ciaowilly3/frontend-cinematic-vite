import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../cinema/api";
import { makeNewFilm, retrieveAllFilms } from "./endpoints";

export const filmApi = createApi({
  reducerPath: "filmsApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: () => ({}),
}).injectEndpoints({
  endpoints: (builder) => ({
    retrieveAllFilms: retrieveAllFilms(builder),
    makeNewFilm: makeNewFilm(builder),
  }),
});

export const { useRetrieveAllFilmsQuery, useMakeNewFilmMutation } = filmApi;
