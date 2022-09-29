import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUsersCart = async (id) => {
  console.log("sinide fetch", id);
  const { data } = await axios.get(`/api/orders/${id}`);
  return data;
};

export const fetchUsersCartThunk = createAsyncThunk(
  "cart/fetchCart",
  async (id) => {
    try {
      let data = await fetchUsersCart(id);
      console.log("inside thunk", data);
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    // Guest Cart Reducers
    addToCart: (state, action) => {
      let found = false;
      state.cart.map((obj, idx) => {
        if (obj.productId === action.payload.productId) {
          state.cart[idx].qty += action.payload.qty;
          found = true;
        }
      });
      !found && state.cart.push({userId : null, orderId: null, productId: action.payload.product.id, qty: action.payload.num, product: action.payload.product});
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.productId !== action.payload
      );
    },
    clearCart: (state) => {
      state.cart = [];
    },
    // for logging out only
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsersCartThunk.fulfilled, (state, action) => {
      console.log("inside reducer", action.payload);
      state.usersCart = action.payload.lineItems;
    });
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice;
