import {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import { Jwt } from "jsonwebtoken";
import { ILoginUser, IRegisterUser } from "../../../interfaces/IUser";
import { Routes } from "../../../enums/routesEnums";
import { HTTP } from "../../../enums/HttpMethodsEnum";

type customBuilder = EndpointBuilder<
  BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    {},
    FetchBaseQueryMeta
  >,
  "login",
  "loginApi"
>;

const login = (builder: customBuilder) =>
  builder.mutation<Jwt, ILoginUser>({
    query: (body) => ({
      url: `${Routes.LOGIN}`,
      method: HTTP.POST,
      body,
    }),
  });

const register = (builder: customBuilder) =>
  builder.mutation<Jwt, IRegisterUser>({
    query: (body) => ({
      url: `${Routes.REGISTER}`,
      method: HTTP.POST,
      body,
    }),
  });

export { login, register };
