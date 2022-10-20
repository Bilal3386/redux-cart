import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { items: [], totalQuantity: 0 };
const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addingItem(state, action) {
      const newItem = action.payload;
      console.log(newItem);
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          totalPrice: newItem.price,
          quantity: newItem.quantity,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    increasingQuantity (state, action)
    {
      const id = action.payload
      const existingItem = state.items.find(item => item.id === id)
      state.totalQuantity++;
      if(existingItem)
      {
        existingItem.quantity++
      }
    },
    removeItems(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items.splice(0, 1);
      } else if (existingItem.quantity >= 1) {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }else {
        state.totalQuantity = 0
      }
    },
  },
});

export const cartAction = cartSlice.actions;
export default cartSlice.reducer;
