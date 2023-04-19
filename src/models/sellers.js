import mongoose, { Schema } from "mongoose";

// schema untuk validasi data sellers
export const sellerSchema = new Schema({
  seller_id: {
    type: mongoose.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  username: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  name: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  password: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  storeName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
  },
});
