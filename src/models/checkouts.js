import mongoose, { Schema } from "mongoose";

export const checkoutSchema = new Schema({
  checkout_id: {
    type: mongoose.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  cart_id: {
    type: Schema.Types.ObjectId,
    ref: "Carts",
  },
  sipping_id: {
    type: Schema.Types.ObjectId,
    ref: "Shippings",
  },
  quantity: {
    type: Schema.Types.ObjectId,
    ref: "Carts",
  },
  totalPrice: {
    type: Schema.Types.ObjectId,
    ref: "Carts",
  },
  location: {
    type: String,
    required: true,
  },
  shippingPrice: {
    type: Schema.Types.ObjectId,
    ref: "Shippings",
  },
});
