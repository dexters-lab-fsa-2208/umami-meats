import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    cartId: null,
  },
  reducers: {
    initializeCart: (state, action) => {
      state.cartId = action.payload;
    },
    addToCart: (state, action) => {
      console.log("hitting reducer");
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
      state.cartId = null;
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart, initializeCart } =
  cartSlice.actions;
export default cartSlice;
