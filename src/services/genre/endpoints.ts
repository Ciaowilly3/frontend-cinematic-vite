import {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';
import { IGenre, GenreDto, IGenres } from '../../interfaces/IGenre';
import { Routes } from '../../enums/routesEnums';
import { HTTP } from '../../enums/HttpMethodsEnum';

export type customBuilder = EndpointBuilder<
  BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    {},
    FetchBaseQueryMeta
  >,
  'genres',
  'genresApi'
>;

const retrieveAllGenres = (builder: customBuilder) =>
  builder.query<IGenres, void>({
    query: () => ({ url: Routes.GENRES, method: HTTP.GET }),
    providesTags: ['genres'],
  });

const makeNewGenre = (builder: customBuilder) =>
  builder.mutation<IGenre, GenreDto>({
    query: (body) => ({
      url: `${Routes.GENRES}/private/make-genre`,
      method: HTTP.POST,
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    }),

    invalidatesTags: ['genres'],
  });

export { retrieveAllGenres, makeNewGenre };
