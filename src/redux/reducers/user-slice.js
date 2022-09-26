import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: undefined,
    isLoggedIn: false,
  },
  reducers: {
    storeUser: (state, action) => {
      console.log(action.payload);
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = undefined;
      state.isLoggedIn = false;
    },
  },
});

export const { storeUser, removeUser } = userSlice.actions;
export default userSlice;
