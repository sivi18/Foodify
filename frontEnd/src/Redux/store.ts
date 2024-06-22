import { configureStore } from "@reduxjs/toolkit";
import productslice from "./Productslice";
import CartSlice from "./CartSlice";

const store = configureStore({
  reducer: {
    product: productslice.product,
    breakfast: productslice.breakfast,
    meal: productslice.meal,
    randommeal: productslice.randommeal,
    seafood: productslice.seafood,
    cart: CartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
