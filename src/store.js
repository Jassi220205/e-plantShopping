import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice.js';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
