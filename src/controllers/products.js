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
    itemCategory,
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
    itemCategory,
    QuantityProduct,
    storeName,
  });

  // saving docs into collection
  const save = async () => {
    await addProductDocs.save((error, data) => {
      // message when data not saved
      if (error) res.send(error);

      // message when data successfully saved
      res.send(data);
      res.send("data berhasil diinput");
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
      $eq: productName,
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
