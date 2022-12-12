import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./reducers/apiSlice";
import cartSlice from "./reducers/cartSlice";
import userSlice from "./reducers/userSlice";
import usersCartSlice from "./reducers/usersCartSlice";
import loggingMiddleware from "redux-logger";
//redux persist
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [apiSlice.reducerPath],
};

const persistedCart = persistReducer(persistConfig, cartSlice.reducer);
const persistedUser = persistReducer(persistConfig, userSlice.reducer);

export const store = configureStore({
  reducer: {
    cart: persistedCart,
    user: persistedUser,
    usersCart: usersCartSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([apiSlice.middleware, thunk]),
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);
