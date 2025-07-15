import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice.jsx'; // make sure this path is correct

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
