// src/CartSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [] // Each item = { name, image, description, cost, quantity }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // ADD ITEM
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i.name === item.name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },

    // REMOVE ITEM
    removeItem: (state, action) => {
      const name = action.payload;
      state.items = state.items.filter(item => item.name !== name);
    },

    // UPDATE QUANTITY
    updateQuantity: (state, action) => {
      const { name, amount } = action.payload;
      const existingItem = state.items.find(i => i.name === name);
      if (existingItem) {
        existingItem.quantity = amount;
      }
    },
  }
});

// Export actions
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
