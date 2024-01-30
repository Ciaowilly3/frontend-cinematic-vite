import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type authTokenState = {
  token: string;
};
const initialState: authTokenState = {
  token: "",
};
const authTokenSlice = createSlice({
  name: "authToken",
  initialState: initialState,
  reducers: {
    memorizeWebToken: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        token: action.payload,
      };
    },
  },
});

export const { memorizeWebToken } = authTokenSlice.actions;
export default authTokenSlice;
