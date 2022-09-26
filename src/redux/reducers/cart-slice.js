import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    usersCart: null,
    cartId: null,
  },
  reducers: {
    // Users cart reducers
    initializeCart: (state, action) => {
      state.cartId = action.payload.id;
      state.usersCart = action.payload.order;
    },
    addToUsersCart: (state, action) => {
      console.log(action.payload);
      let found = false;
      state.usersCart.map((obj, idx) => {
        if (obj.productId === action.payload.newData.productId) {
          state.usersCart[idx].qty += action.payload.num;
          found = true;
        }
      });
      !found && state.usersCart.push(action.payload.newData);
    },
    removeFromUsersCart: (state, action) => {
      state.usersCart = state.usersCart.filter(
        (item) => item.productId !== action.payload
      );
    },
    // Guest Cart Reducers
    addToCart: (state, action) => {
      console.log(action.payload);
      let found = false;
      state.cart.map((obj, idx) => {
        if (obj.productId === action.payload.productId) {
          state.cart[idx].qty += action.payload.qty;
          found = true;
        }
      });
      !found && state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      console.log(action.payload);
      state.cart = state.cart.filter(
        (item) => item.productId !== action.payload
      );
    },
    clearCart: (state) => {
      state.cart = [];
    },
    // for logging out only
    clearUserCart: (state) => {
      state.cartId = null;
      state.usersCart = null;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  clearUserCart,
  initializeCart,
  addToUsersCart,
  removeFromUsersCart,
} = cartSlice.actions;
export default cartSlice;
