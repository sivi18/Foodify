import mongoose, { Document } from "mongoose";
export interface CartcheckoutType extends Document {
  id: string;
  mealName: string;
  quantity: number;
  price: number;
  mealThumb: string;
}
const CartItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  mealName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  mealThumb: { type: String, required: true },
});

const CartCheckout = mongoose.model<CartcheckoutType[]>(
  "CartItem",
  CartItemSchema
);

module.exports = { CartCheckout };
