import mongoose, { Schema } from "mongoose";

// schema untuk validasi data products
export const productSchema = new Schema({
  product_id: {
    type: mongoose.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  seller_id: {
    type: Schema.Types.ObjectId,
    ref: "Sellers",
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: "Categorys",
  },
  productName: {
    type: String,
    required: [true, "product name required, please input a product name"],
    maxLength: [20, "product name cannot be longer than 20 characters"],
  },
  descriptionProduct: {
    type: String,
    default: "seller has not written a description",
    maxLength: [50, "description cannot be longer than 50 characters"],
  },
  photoProduct: {
    type: String,
    required: [true, "photo product required, please input photo of product"],
  },
  unitPrice: {
    type: Number,
    required: [true, "price required, please input price"],
    default: 0,
    min: 1,
    max: [9, "price exceeds the maximum transaction limit"],
  },
  address: {
    type: String,
    maxLength: [50, "address cannot be longer than 50 characters"],
  },
  location: {
    type: String,
    required: [true, "location required, please input location"],
    maxLength: [50, "location cannot be longer than 50 characters"],
  },
  category: {
    type: String,
    minLength: [3, "Category name cannot be less than 3 characters"],
    maxLength: [15, "category name cannot be longer than 50 characters"],
  },
  quantityProduct: {
    type: Number,
    default: 0,
    min: 1,
    max: [9, "quantity exceeds the maximum limit"],
  },
  storeName: {
    type: Schema.Types.ObjectId,
    ref: "Sellers",
  },
});
