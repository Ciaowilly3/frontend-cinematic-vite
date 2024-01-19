import { HTTP } from "../../enums/HttpMethodsEnum";
import { Routes } from "../../enums/routesEnums";
import { IFilm, IFilms } from "../../interfaces/IFilm";
import { customBuilder } from "../utils";

const retrieveAllFilms = (builder: customBuilder) =>
  builder.query<IFilms, void>({
    query: () => Routes.films,
    providesTags: ["films"],
  });
const makeNewFilm = (builder: customBuilder) =>
  builder.mutation<IFilm, IFilm>({
    query: (body) => ({
      url: Routes.films,
      method: HTTP.POST,
      body,
    }),
    invalidatesTags: ["films"],
  });
export { retrieveAllFilms, makeNewFilm };

//TODO: componente links
//TODO: finire le crud per film
