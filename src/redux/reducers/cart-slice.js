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
      state.usersCart = action.payload.order.lineItems;
    },
    addToUsersCart: (state, action) => {
      let found = false;
      state.usersCart.map((obj, idx) => {
        if (obj.productId === action.payload.productId) {
          console.log("found");
          state.usersCart[idx].qty += action.payload.qty;
          found = true;
        }
      });
      !found && state.usersCart.push(action.payload);
      console.log("inside reducer", action.payload);
    },
    // Guest Cart Reducers
    addToCart: (state, action) => {
      let found = false;
      state.cart.map((obj, idx) => {
        if (obj.name === action.payload.name) {
          state.cart[idx].quantity += action.payload.quantity;
          found = true;
        }
      });
      !found && state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
    // for logging out only
    clearUserCart: (state) => {
      state.cartId = null;
      state.userOrder = null;
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
} = cartSlice.actions;
export default cartSlice;
