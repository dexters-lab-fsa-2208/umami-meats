import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "../reducers/apiSlice";
import cartSlice from "../reducers/cart-slice";
import userSlice from "../reducers/user-slice";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    user: userSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
