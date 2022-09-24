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
      // console.log('remove slice', state.cart.indexOf(action.payload.name));
      // const idx = state.cart.indexOf(action.payload);
      // if (idx !== -1) {
      // state.cart.splice(idx, 1);
      // }
      state.cart = state.cart.filter(obj => obj.name !== action.payload.name)
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice;
