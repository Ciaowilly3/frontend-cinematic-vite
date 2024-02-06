import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type authTokenState = {
  token: string;
  expirationDate: string;
};
const initialState: authTokenState = {
  token: "",
  expirationDate: "",
};
const authTokenSlice = createSlice({
  name: "authToken",
  initialState: initialState,
  reducers: {
    memorizeWebToken: (state, action: PayloadAction<string>) => {
      const expirationDate = new Date(Date.now() + 1000 * 60 * 60);
      console.log(typeof expirationDate.toLocaleString());

      return {
        ...state,
        token: action.payload,
        expirationDate: expirationDate.toLocaleString(),
      };
    },
  },
});

export const { memorizeWebToken } = authTokenSlice.actions;
export default authTokenSlice;
