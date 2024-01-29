import {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import { HTTP } from "../../enums/HttpMethodsEnum";
import { Routes } from "../../enums/routesEnums";
import { IFilm, IFilmDto, IFilms } from "../../interfaces/IFilm";

type customBuilder = EndpointBuilder<
  BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    {},
    FetchBaseQueryMeta
  >,
  "films",
  "filmsApi"
>;

const retrieveAllFilms = (builder: customBuilder) =>
  builder.query<IFilms, void>({
    query: () => Routes.films,
    providesTags: ["films"],
  });
const makeNewFilm = (builder: customBuilder) =>
  builder.mutation<IFilm, IFilmDto>({
    query: (body) => ({
      url: Routes.films,
      method: HTTP.POST,
      body,
    }),
    invalidatesTags: ["films"],
  });
const updateFilmById = (builder: customBuilder) =>
  builder.mutation<IFilm, { id: string; body: IFilmDto }>({
    query: ({ id, body }) => ({
      url: `${Routes.films}/private/update-film/${id}`,
      method: HTTP.PUT,
      body: body,
    }),
    invalidatesTags: ["films"],
  });
const deleteFilmById = (builder: customBuilder) =>
  builder.mutation<void, string>({
    query: (id) => ({
      url: `${Routes.films}/delete-film/${id}`,
      method: HTTP.DELETE,
    }),
    invalidatesTags: ["films"],
  });
export { retrieveAllFilms, makeNewFilm, updateFilmById, deleteFilmById };
