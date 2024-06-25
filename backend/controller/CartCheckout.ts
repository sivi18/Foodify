const asyncHandler = require("express-async-handler");
import { Request, Response } from "express";
const { CartCheckout } = require("../model/CheckoutModel");

interface CreateItemRequest extends Request {
  body: {
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
    const { cartItems } = req.body;
    console.log(cartItems);

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart items are required" });
    }

    try {
      await CartCheckout.create({ cartItems });
      res.status(201).json({ message: "Cart items successfully stored" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }
);
module.exports = { checkoutCart };
