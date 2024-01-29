import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type authTokenState = string | null;

const authTokenSlice = createSlice({
  name: "authToken",
  initialState: null as authTokenState,
  reducers: {
    memorizeWebToken: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { memorizeWebToken } = authTokenSlice.actions;
export default authTokenSlice;
