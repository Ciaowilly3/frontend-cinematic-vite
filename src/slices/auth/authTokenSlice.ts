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
    memorizeWebToken: (_, action: PayloadAction<string>) => {
      const expirationDate = new Date(Date.now() + 1000 * 60 * 60);
      const expiration = Date.parse(expirationDate.toISOString());

      return {
        token: action.payload,
        expirationDate: expiration.toString(),
      };
    },
    deleteWebToken: () => {
      return initialState;
    },
  },
});
export const { memorizeWebToken, deleteWebToken } = authTokenSlice.actions;
export default authTokenSlice;
