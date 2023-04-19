import mongoose, { Schema } from "mongoose";

export const shopSchema = new Schema({
  shop_id: {
    type: mongoose.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  storeName: {
    type: Schema.Types.ObjectId,
    ref: "Products",
  },
  productName: {
    type: Schema.Types.ObjectId,
    ref: "Products",
  },
  unitPrice: {
    type: Schema.Types.ObjectId,
    ref: "Products",
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Products",
  },
});
