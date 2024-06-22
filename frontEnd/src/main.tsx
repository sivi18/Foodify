import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./output.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AllCategory from "./components/Category/Category.tsx";
import Menu from "./components/Menu.tsx";
import BreakFast from "./components/Category/BreakFast.tsx";
import MeatCategory from "./components/Category/MeatCategory.tsx";
import { Provider } from "react-redux";
import store from "./Redux/store.ts";
import {
  fetchBreakfast,
  fetchProduct,
  fetchRandomMeal,
  fetchSeeFood,
  fetchSpecialIngredientMeal,
} from "./Redux/Productslice.ts";
import Cart from "./components/Cart.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <AllCategory />,
        index: true,
      },
      {
        path: "/breakfast",
        element: <BreakFast />,
      },
      {
        path: "/seefood",
        element: <MeatCategory />,
      },
    ],
  },
  {
    path: "/menu",
    element: <Menu />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
]);
store.dispatch(fetchProduct());
store.dispatch(fetchBreakfast());
store.dispatch(fetchRandomMeal());
store.dispatch(fetchSpecialIngredientMeal());
store.dispatch(fetchSeeFood());
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
