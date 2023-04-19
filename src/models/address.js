import mongoose, { Schema } from "mongoose";

export const addressSchema = new Schema({
  address_id: {
    type: mongoose.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  users_id: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  address: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  location: String,
});
