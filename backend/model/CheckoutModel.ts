import mongoose, { Document, Schema } from "mongoose";

// Define the interface for a single cart item
export interface CartItemType extends Document {
  id: string;
  mealName: string;
  quantity: number;
  price: number;
  mealThumb: string;
}

// Define the schema for a single cart item
const CartItemSchema = new Schema<CartItemType>({
  id: { type: String, required: true },
  mealName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  mealThumb: { type: String, required: true },
});

// Define the interface for the checkout containing multiple cart items
export interface CartCheckoutType extends Document {
  cartItems: CartItemType[];
}

// Define the schema for the checkout
const CartCheckoutSchema = new Schema<CartCheckoutType>({
  cartItems: { type: [CartItemSchema], required: true },
});

const CartCheckout = mongoose.model<CartCheckoutType>(
  "CartCheckout",
  CartCheckoutSchema
);

module.exports = { CartCheckout };
