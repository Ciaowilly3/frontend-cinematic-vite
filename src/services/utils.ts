import { FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

type customBuilder = EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, "api">
