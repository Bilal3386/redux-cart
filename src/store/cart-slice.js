import { createSlice } from "@reduxjs/toolkit";
import { uiAction } from "./ui-slice";
const initialCartState = { items: [], totalQuantity: 0 };
const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
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
          quantity: 1,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    increasingQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity++;
      if (existingItem) {
        existingItem.quantity++;
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
      } else {
        state.totalQuantity = 0;
      }
    },
  },
});
 export const addItem = (cart) => {
  return async (dispatch) => {
    const sendData = async () => {
      dispatch(
        uiAction.setNotification({
          status: "pending",
          title: "Sending...",
          message: "sending cart data!",
        })
      );
      const response = await fetch(
        "https://redux-cart-7f464-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong...");
      }
    };
    
    try {
     await sendData()
     dispatch(
      uiAction.setNotification({
        status: "success",
        title: "Success...",
        message: "sending cart data successfully!",
      })
    );
    // dispatch(cartAction.addingItem(cart))
    }catch (error) {
      sendData().catch((error) =>
      dispatch(
        uiAction.setNotification({
          status: "error",
          title: "Error...",
          message: "sending cart data failed!",
        })
      )
    );
    }
  }
 }
export const cartAction = cartSlice.actions;
export default cartSlice.reducer;
