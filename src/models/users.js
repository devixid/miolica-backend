import mongoose from "mongoose";

const { Schema } = mongoose;

// schema untuk validasi data users
export const usersSchema = new Schema({
  users_id: {
    type: mongoose.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "Products",
  },
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
  },
  email: {
    type: String,
    required: true,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 20,
  },
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
  },
  address: {
    type: String,
    required: true,
    maxLength: 50,
  },
  wishlist: {
    type: Object,
    wishlist_id: {
      type: mongoose.ObjectId,
      default: new mongoose.Types.ObjectId(),
    },
    productName: {
      type: String,
      ref: "Products",
    },
    unitPrice: {
      type: Number,
      ref: "Products",
    },
    category: {
      type: String,
      ref: "Products",
    },
  },
  cart: {
    type: Object,
    cart_id: {
      type: mongoose.ObjectId,
      default: new mongoose.Types.ObjectId(),
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    quantity: {
      type: Number,
      required: true,
      max: 3,
    },
    totalPrice: {
      type: Number,
      required: true,
      max: 9,
    },
  },
  photoProfile: String,
  saldo: {
    type: Number,
    default: 0,
    min: 1,
    max: 15,
  },
});
