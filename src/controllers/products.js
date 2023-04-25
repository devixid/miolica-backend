import { Products } from "@/models";
import mongoose from "mongoose";

// handler method post pada products
const addProduct = (req, res) => {
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
    storeName,
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
    storeName,
  });

  // saving docs into collection
  const save = async () => {
    await addProductDocs.save((error, data) => {
      // message when data not saved
      if (error) {
        return res
          .json({
            status: false,
            message: error,
          })
          .status(404);
      }

      // message when data successfully saved
      return res
        .json({
          status: true,
          message: "data berhasil diinput",
          data,
        })
        .status(200);
    });
    return addProductDocs;
  };
  save();
};
addProduct();

// handler method get all pada products
const getAllProducts = async (req, res) => {
  // query to get all products from collection
  const data = await Products.findMany();

  // validator if data exist or not
  if (!data) {
    return res
      .json({
        status: false,
        message: "data tidak ditemukan!",
      })
      .status(404);
  }
  return res
    .json({
      status: true,
      message: "data ditemukan",
      data,
    })
    .status(200);
};
getAllProducts();

// handler get by name pada products
const getProductByName = async (req, res) => {
  const { productName } = req.body;

  // query to get data products from collection
  const data = await Products.findMany({
    productName: {
      $regex: /productName/,
      $options: "i",
    },
  });

  // validator if data exist or not
  if (!data) {
    return res
      .json({
        status: false,
        message: `products dengan nama ${productName} tidak ditemukan!`,
      })
      .status(404);
  }
  return res
    .json({
      status: true,
      message: `products dengan nama ${productName} ditemukan`,
      data,
    })
    .status(200);
};
getProductByName();

// handler get by categries pada products
const getProductByCategories = async (req, res) => {
  const { Category } = req.body;

  // query to get data products from collection
  const data = await Products.findMany({
    Category: {
      $eq: Category,
    },
  });

  // validator if data exist or not
  if (!data) {
    return res
      .json({
        status: false,
        message: `products dengan categories ${Category} tidak ditemukan!`,
      })
      .status(404);
  }
  return res
    .json({
      status: true,
      message: `products dengan categories ${Category} ditemukan`,
      data,
    })
    .status(200);
};
getProductByCategories();
