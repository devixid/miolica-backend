import mongoose, { Schema } from "mongoose";

// schema untuk validasi data buyers
export const buyerSchema = new Schema({
  buyer_id: {
    type: mongoose.ObjectId,
    default: new mongoose.Types.ObjectId(),
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
});
