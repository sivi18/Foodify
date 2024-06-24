import { configureStore } from "@reduxjs/toolkit";
import productslice from "./Productslice";
import CartSlice from "./CartSlice";
import loginslice from "./loginslice";

const store = configureStore({
  reducer: {
    product: productslice.product,
    breakfast: productslice.breakfast,
    meal: productslice.meal,
    randommeal: productslice.randommeal,
    seafood: productslice.seafood,
    cart: CartSlice,
    login: loginslice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
