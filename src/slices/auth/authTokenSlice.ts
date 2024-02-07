import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type authTokenState = {
  token: string;
  expirationDate: string;
};
const initialState: authTokenState = {
  token: '',
  expirationDate: '',
};
const authTokenSlice = createSlice({
  name: 'authToken',
  initialState: initialState,
  reducers: {
    memorizeWebToken: (state, action: PayloadAction<string>) => {
      const expirationDate = new Date(Date.now() + 1000 * 60 * 60);
      const expiration = action.payload
        ? Date.parse(expirationDate.toISOString())
        : '';

      return {
        ...state,
        token: action.payload,
        expirationDate: expiration.toString(),
      };
    },
  },
});

export const { memorizeWebToken } = authTokenSlice.actions;
export default authTokenSlice;
