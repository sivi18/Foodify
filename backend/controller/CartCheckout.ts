import { Request, Response } from "express";
import { CartCheckout } from "../model/CheckoutModel";
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
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
interface CartCheckoutEventRequest extends Request {
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

const checkoutCartEvent = asyncHandler(
  async (req: CartCheckoutEventRequest, res: Response) => {
    const { cartItems } = req.body;
    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.mealName,
          image: item.mealThumb,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_type: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/",
      cancel_url: "http://localhost:5173/",
    });
    res.json({ id: session.id });
  }
);
export { checkoutCart, checkoutCartEvent };
