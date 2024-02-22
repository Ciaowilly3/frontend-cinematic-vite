import {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';
import { HTTP } from '../../enums/HttpMethodsEnum';
import { Routes } from '../../enums/routesEnums';
import { IFilm, FilmDto, IFilms } from '../../interfaces/IFilm';

export type customBuilder = EndpointBuilder<
  BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    {},
    FetchBaseQueryMeta
  >,
  'films',
  'filmsApi'
>;

const retrieveAllFilms = (builder: customBuilder) =>
  builder.query<IFilms, void>({
    query: () => ({ url: Routes.FILMS, method: HTTP.GET }),
    providesTags: ['films'],
  });
const makeNewFilm = (builder: customBuilder) =>
  builder.mutation<IFilm, FilmDto>({
    query: (body) => ({
      url: `${Routes.FILMS}/private`,
      method: HTTP.POST,
      body,
    }),
    invalidatesTags: ['films'],
  });
const updateFilmById = (builder: customBuilder) =>
  builder.mutation<IFilm, { id: string; body: FilmDto }>({
    query: ({ id, body }) => ({
      url: `${Routes.FILMS}/private/update-film/${id}`,
      method: HTTP.PUT,
      body: body,
    }),
    invalidatesTags: ['films'],
  });
const deleteFilmById = (builder: customBuilder) =>
  builder.mutation<void, string>({
    query: (id) => ({
      url: `${Routes.FILMS}/delete-film/${id}`,
      method: HTTP.DELETE,
    }),
    invalidatesTags: ['films'],
  });
export { retrieveAllFilms, makeNewFilm, updateFilmById, deleteFilmById };
