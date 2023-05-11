import { Products } from "@/models";
import mongoose from "mongoose";

const productCustomError = (err) => {
  console.log(err.message, err.code);

  const errors = {
    productName: "",
    descriptionProduct: "",
    photoProduct: "",
    unitPrice: "",
    address: "",
    location: "",
    Category: "",
    QuantityProduct: "",
    storeName: "",
  };

  // validation error message
  if (err.message.includes("Products validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

// handler method post pada products
export const addProduct = async (req, res) => {
  // take data from req body
  const {
    productName,
    descriptionProduct,
    photoProduct,
    unitPrice,
    address,
    location,
    Category,
    quantityProduct,
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
    quantityProduct,
    storeName, // idk storeName logic(this logic not right yet)
  });

  // saving docs into collection
  try {
    await addProductDocs.save();
  } catch (err) {
    // validate if data not right
    const errors = productCustomError(err);
    res
      .json({
        status: false,
        message: "data gagal diinput",
        reason: errors,
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

// handler method put pada product
export const updateProduct = async (req, res) => {
  const {
    product_id,
    productName,
    descriptionProduct,
    photoProduct,
    unitPrice,
    address,
    location,
    Category,
    quantityProduct,
    storeName, // idk storeName logic(this logic not right yet)
  } = req.body;

  // validate if product exist or not
  const findProduct = await Products.findOne({
    product_id,
  });

  // validator update profile by id
  if (findProduct) {
    const filter = { product_id };
    const update = {
      $set: {
        productName,
        descriptionProduct,
        photoProduct,
        unitPrice,
        address,
        location,
        Category,
        quantityProduct,
        storeName,
      },
    };

    try {
      await Products.findOneAndUpdate(filter, update);
    } catch (err) {
      const errors = productCustomError(err);
      res
        .json({
          status: false,
          message: "Product gagal diperbarui",
          reason: errors,
        })
        .status(400);
      return;
    }

    const updatedProduct = await Products.findOne({ product_id });
    res
      .json({
        status: true,
        message: "product berhasil diperbarui",
        data: updatedProduct,
      })
      .status(200);
    return;
  }
  res
    .json({
      status: false,
      message: "product tidak ditemukan",
    })
    .status(404);
};
