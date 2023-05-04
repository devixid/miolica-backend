import { Products } from "@/models";
import mongoose from "mongoose";

// handler method post pada products
export const addProduct = (req, res) => {
  // take data from req body
  const {
    productName,
    descriptionProduct,
    photoProduct,
    unitPrice,
    address,
    location,
    Category,
    QuantityProduct,
    storeName, // idk storeName logic(this logic not right yet)
  } = req.body;

  // input data into docs
  const addProductDocs = new Products({
    product_id: new mongoose.Types.ObjectId(),
    productName,
    descriptionProduct,
    photoProduct,
    unitPrice,
    address,
    location,
    Category,
    QuantityProduct,
    storeName, // idk storeName logic(this logic not right yet)
  });

  // saving docs into collection
  const save = async () => {
    await addProductDocs.save();
  };
  save();

  // validator
  if (!save()) {
    res
      .json({
        status: false,
        message: "data gagal diinput",
      })
      .status(400);
    return;
  }
  res
    .json({
      status: true,
      message: "data berhasil diinput",
    })
    .status(200);
};

// handler method get all pada products
export const getAllProducts = async (req, res) => {
  // query to get all products from collection
  const data = await Products.find().populate("Sellers", "storeName");

  // validator if data exist or not
  if (data == null) {
    res
      .json({
        status: false,
        message: "data tidak ditemukan!",
      })
      .status(404);
    return;
  }
  res
    .json({
      status: true,
      message: "data ditemukan",
      data,
    })
    .status(200);
};

// handler get by name pada products
export const getProductByName = async (req, res) => {
  const { productName } = req.body;

  // query to get data products from collection
  const data = await Products.find({
    productName: {
      $regex: /productName/,
      $options: "i",
    },
  });

  // validator if data exist or not
  if (data == null) {
    res
      .json({
        status: false,
        message: `products dengan nama ${productName} tidak ditemukan!`,
      })
      .status(404);
    return;
  }
  res
    .json({
      status: true,
      message: `products dengan nama ${productName} ditemukan`,
      data,
    })
    .status(200);
};

// handler get by categries pada products
export const getProductByCategories = async (req, res) => {
  const { Category } = req.body;

  // query to get data products from collection
  const data = await Products.find({
    Category: {
      $eq: Category,
    },
  });

  // validator if data exist or not
  if (data == null) {
    res
      .json({
        status: false,
        message: `products dengan categories ${Category} tidak ditemukan!`,
      })
      .status(404);
    return;
  }
  res
    .json({
      status: true,
      message: `products dengan categories ${Category} ditemukan`,
      data,
    })
    .status(200);
};
