import { ICinemaList } from "../../interfaces/ICinemas";
import { FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";


type customBuilder = EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, "cinemaApi">

const retrieveAllCinema = (builder : customBuilder) =>
    builder.query<ICinemaList, void>({
        query: () => `cinema`,
    })

export {retrieveAllCinema}