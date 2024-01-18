import {
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  BaseQueryFn,
  EndpointBuilder,
} from "@reduxjs/toolkit/query";

export type customBuilder = EndpointBuilder<
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
