import mongoose, { Schema } from "mongoose";

export const shippingSchema = new Schema({
  shipping_id: {
    type: mongoose.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  location: String,
  shippingPrice: Number,
});
