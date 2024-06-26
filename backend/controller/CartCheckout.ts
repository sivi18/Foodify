import { Request, Response } from "express";
import { CartCheckout } from "../model/CheckoutModel";
const asyncHandler = require("express-async-handler");
interface CreateItemRequest extends Request {
  body: {
    username: string;
    email: string;
    totalprice: number;
    cartItems: Array<{
      id: string;
      mealName: string;
      quantity: number;
      price: number;
      mealThumb: string;
    }>;
  };
}

const checkoutCart = asyncHandler(
  async (req: CreateItemRequest, res: Response) => {
    const { username, email, cartItems, totalprice } = req.body;

    if (
      !username ||
      !email ||
      !cartItems ||
      !totalprice ||
      !Array.isArray(cartItems) ||
      cartItems.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "Username, email, and cart items are required" });
    }

    try {
      const newCart = new CartCheckout({
        username,
        email,
        cartItems,
        totalprice,
      });
      await newCart.save();
      res.status(201).json({ message: "Cart items successfully stored" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }
);

export { checkoutCart };
