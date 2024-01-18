import { createSlice } from "@reduxjs/toolkit";

export type formModalState = boolean;

const initialState: boolean = false;

const formModalSlice = createSlice({
  name: "formModal",
  initialState,
  reducers: {
    toggleFormModal: (state) => {
      return !state;
    },
  },
});

export const { toggleFormModal } = formModalSlice.actions;
export default formModalSlice;
