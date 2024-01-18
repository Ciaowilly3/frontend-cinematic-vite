import {
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  BaseQueryFn,
  EndpointBuilder,
} from "@reduxjs/toolkit/query";
import { IFilm, IFilms } from "../../interfaces/IFilm";
type customBuilder = EndpointBuilder<
  BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    {},
    FetchBaseQueryMeta
  >,
  never,
  "filmsApi"
>;

const retrieveAllFilms = (builder: customBuilder) =>
  builder.query<IFilms, void>({
    query: () => `films`,
  });
const makeNewFilm = (builder: customBuilder) =>
  builder.mutation<IFilm, IFilm>({
    query: (body) => ({
      url: "films",
      method: "POST",
      body,
    }),
  });
export { retrieveAllFilms, makeNewFilm };

//TODO: taggare le chiamate
//TODO: ENUM per le rotte
//TODO: ENUM per i metodi POST = HTTP.POST
