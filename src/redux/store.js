import { configureStore } from "@reduxjs/toolkit";
import { apiSlice, userSlice, usersCartSlice, cartSlice } from "./reducers";
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
// import loggingMiddleware from "redux-logger";

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
  /*.concat(loggingMiddleware)*/
});

export const persistor = persistStore(store);
