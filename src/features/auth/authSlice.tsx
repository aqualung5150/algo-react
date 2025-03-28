import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connecting: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    finishConnection: (state) => {
      state.connecting = false;
    },
  },
});

export default authSlice;

export const { finishConnection } = authSlice.actions;
