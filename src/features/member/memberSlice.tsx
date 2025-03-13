import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

const initialState = {
  id: null,
  email: "",
  username: "",
  imageUrl: "",
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.imageUrl = action.payload.imageUrl;
    },

    resetUser: () => initialState,

    updateUser: (state, action) => {
      Object.entries(action.payload).forEach(([key, value]) => {
        Object.assign(state, { [key]: value });
      });
    },

    // logout: (state, action) => {
    //   const url = `${process.env.REACT_APP_BASE_URL}/api/auth/logout`;
    //   axios.post(url, {}).catch(() => {});

    //   window.location.href = action.payload;
    //   return initialState;
    // },
  },
});

export default memberSlice;

export const { setUser, resetUser, updateUser } = memberSlice.actions;
// export const { setUser, resetUser, updateUser, logout } = memberSlice.actions;
