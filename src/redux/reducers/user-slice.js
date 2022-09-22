import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: null,
    isLoggedIn: false,
    usersCart: [],
  },
  reducers: {
    storeUser: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    removeUser: (state) => {
      (state.user = null), (state.isLoggedIn = false);
    },
    getUsersCart: (state, action) => {
      state.usersCart = action.payload;
    },
  },
});

export const { storeUser, removeUser } = userSlice.actions;
export default userSlice;
