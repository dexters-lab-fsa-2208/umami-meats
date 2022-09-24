import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      console.log("hitting reducer");
      let found = false;
      state.cart.map((obj, idx) => {
        if (obj.name === action.payload.name){
          state.cart[idx].quantity += action.payload.quantity
          found = true;
        }
      });
      !found && state.cart.push(action.payload)
    },
    removeFromCart: (state, action) => {
      state.cart.splice(action.payload.id, 1);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice;
