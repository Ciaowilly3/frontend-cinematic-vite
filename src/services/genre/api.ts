import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils";
import { authTokenState } from "../../slices/auth/authTokenSlice";
import { makeNewGenre, retrieveAllGenres } from "./endpoints";
import { RootState } from "../../store/store";

export const genresApi = createApi({
  tagTypes: ["genres"],
  reducerPath: "genresApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const authToken: authTokenState = (getState() as RootState).authToken;

      authToken.token
        ? headers.set("authorization", `Bearer ${authToken.token}`)
        : "";
      return headers;
    },
  }),
  endpoints: () => ({}),
}).injectEndpoints({
  endpoints: (builder) => ({
    retrieveAllGenres: retrieveAllGenres(builder),
    makeNewGenre: makeNewGenre(builder),
  }),
});

export const { useRetrieveAllGenresQuery, useMakeNewGenreMutation } = genresApi;
