import {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query';
import { ILoginUser, IRegisterUser } from '../../../interfaces/IUser';
import { Routes } from '../../../enums/routesEnums';
import { HTTP } from '../../../enums/HttpMethodsEnum';

type customBuilder = EndpointBuilder<
  BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    {},
    FetchBaseQueryMeta
  >,
  'login',
  'loginApi'
>;

interface JwtToken {
  token: string;
}

const login = (builder: customBuilder) =>
  builder.mutation<JwtToken, ILoginUser>({
    query: (body) => ({
      url: `${Routes.LOGIN}`,
      method: HTTP.POST,
      body,
    }),
  });

const register = (builder: customBuilder) =>
  builder.mutation<JwtToken, IRegisterUser>({
    query: (body) => ({
      url: `${Routes.REGISTER}`,
      method: HTTP.POST,
      body,
    }),
  });

export { login, register };
