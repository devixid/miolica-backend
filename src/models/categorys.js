import mongoose, { Schema } from "mongoose";

export const categorySchema = new Schema({
  category_id: {
    type: mongoose.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  Category: {
    type: String,
    minLength: 3,
    maxLength: 15,
  },
  descriptionCategory: {
    type: String,
    maxLength: 50,
  },
  thumbnailPhoto: String,
});
