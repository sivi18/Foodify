import mongoose, { Document, Schema } from "mongoose";

export interface CartItemType extends Document {
  id: string;
  mealName: string;
  quantity: number;
  price: number;
  mealThumb: string;
}

const CartItemSchema = new Schema<CartItemType>({
  id: { type: String, required: true },
  mealName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  mealThumb: { type: String, required: true },
});

export interface CartCheckoutType extends Document {
  cartItems: CartItemType[];
}
const CartCheckoutSchema = new Schema<CartCheckoutType>({
  cartItems: { type: [CartItemSchema], required: true },
});

const CartCheckout = mongoose.model<CartCheckoutType>(
  "CartCheckout",
  CartCheckoutSchema
);

module.exports = { CartCheckout };
