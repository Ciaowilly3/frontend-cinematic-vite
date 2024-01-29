import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils";
import { login, register } from "./endpoints";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL + "auth/" }),
  endpoints: () => ({}),
}).injectEndpoints({
  endpoints: (builder) => ({
    login: login(builder),
    register: register(builder),
  }),
});

export const { useLoginMutation, useRegisterMutation } = loginApi;

//TODO: salvare token nei cookies
//TODO: provare a mantenere la sessione valida al ricaricare
