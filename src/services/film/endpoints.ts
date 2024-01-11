import { FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";
import { IFilms } from "../../interfaces/IFilm";
type customBuilder = EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, "filmsApi">


const retrieveAllFilms = (builder : customBuilder) =>
    builder.query<IFilms, void>({
        query: () => `films`,
    })

export {retrieveAllFilms}