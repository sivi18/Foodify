import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

interface CartItem {
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

export const AddtoCart = createAsyncThunk(
  "/addCart",
  async (cartItem: CartItem) => {
    const { id, mealName, quantity, price, mealThumb } = cartItem;
    return { id, mealName, quantity, price, mealThumb };
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
  },
});

export const {
  selectAll: selectAllCartItems,
  selectById: selectCartItemById,
  selectIds: selectCartItemIds,
} = CartAdapter.getSelectors((state: CartItem[]) => state.cart);

export default CartSlice.reducer;
