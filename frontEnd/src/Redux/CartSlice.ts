import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

export interface CartItem {
  id: string;
  mealName: string;
  quantity: number;
  mealThumb: string;
  price: number;
}
export interface UpdateCartType {
  id: string;
  quantity: number;
}
const CartAdapter = createEntityAdapter<CartItem>({
  selectId: (item) => item.id,
});
const baseUrl = "http://127.0.0.1:5000";

const token = sessionStorage.getItem("token");
export const AddtoCart = createAsyncThunk(
  "/addCart",
  async (cartItem: CartItem) => {
    const { id, mealName, quantity, price, mealThumb } = cartItem;
    try {
      const response = await axios.post(`${baseUrl}/createCart`, cartItem, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        return { id, mealName, quantity, price, mealThumb };
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const UpdateCartEvent = createAsyncThunk(
  "/updateCart",
  async (item: UpdateCartType) => {
    const { id, quantity } = item;
    return { id, quantity };
  }
);
export const DeleteCartEvent = createAsyncThunk(
  "/DeleteItemInCart",
  async (id: string) => {
    return { id };
  }
);

export const checkoutEvent = createAsyncThunk(
  "/checkout",
  async (cartItems) => {
    try {
      const response = await axios.post(`${baseUrl}/checkout`, cartItems, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error; // Propagate the error
    }
  }
);
const CartSlice = createSlice({
  name: "cart",
  initialState: CartAdapter.getInitialState({}),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AddtoCart.fulfilled, (state, action) => {
      CartAdapter.addOne(state, action.payload);
    });
    builder.addCase(UpdateCartEvent.fulfilled, (state, action) => {
      CartAdapter.updateOne(state, {
        id: action.payload.id,
        changes: { quantity: action.payload.quantity },
      });
    });
    builder.addCase(DeleteCartEvent.fulfilled, (state, action) => {
      CartAdapter.removeOne(state, action.payload.id);
    });
    builder.addCase(checkoutEvent.fulfilled, (state, action) => {
      console.log(action.payload);
      CartAdapter.removeAll(state);
    });
  },
});

export const {
  selectAll: selectAllCartItems,
  selectById: selectCartItemById,
  selectIds: selectCartItemIds,
} = CartAdapter.getSelectors((state: CartItem[]) => state.cart);

export default CartSlice.reducer;
