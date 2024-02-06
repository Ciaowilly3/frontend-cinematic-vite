import {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import { IGenre, GenreDto } from "../../interfaces/IGenre";
import { Routes } from "../../enums/routesEnums";
import { HTTP } from "../../enums/HttpMethodsEnum";

type customBuilder = EndpointBuilder<
  BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    {},
    FetchBaseQueryMeta
  >,
  "genres",
  "genresApi"
>;

const retrieveAllGenres = (builder: customBuilder) =>
  builder.query<IGenre, void>({
    query: () => Routes.GENRES,
    providesTags: ["genres"],
  });

const makeNewGenre = (builder: customBuilder) =>
  builder.mutation<IGenre, GenreDto>({
    query: (body) => ({
      url: `${Routes.GENRES}/private/make-genre`,
      method: HTTP.POST,
      body,
      headers: {
        "Content-Type": "application/json",
      },
    }),

    invalidatesTags: ["genres"],
  });

export { retrieveAllGenres, makeNewGenre };
