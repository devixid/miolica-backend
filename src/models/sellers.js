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
    required: [true, "storeName required, please input a storeName"],
    minLength: [3, "storeName cannot be less than 3 characters"],
    maxLength: [20, "storeName cannot be longer than 20 characters"],
  },
});
