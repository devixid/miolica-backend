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
    category,
    quantityProduct,
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
    category,
    quantityProduct,
    storeName,
  });

  // saving docs into collection
  try {
    await addProductDocs.save();
    res.status(200).json({
      status: true,
      message: "data berhasil diinput",
    });
    return;
  } catch (err) {
    // validate if data not right
    const errors = productCustomError(err);
    res.status(400).json({
      status: false,
      message: "data gagal diinput",
      reason: errors,
    });
  }
};

// handler method get all pada products
export const getAllProducts = async (req, res) => {
  const option = {
    path: "storeName",
    select: "storeName",
    strictPopulate: false,
  };
  // query to get all products from collection
  const product = await Products.find().populate(option);

  // validator if data exist or not
  if (product == null) {
    res.status(404).json({
      status: false,
      message: "data tidak ditemukan!",
    });
    return;
  }
  res.status(200).json({
    status: true,
    message: "data ditemukan",
    product,
  });
};

// handler get by name pada products
export const getProductById = async (req, res) => {
  const { id } = req.params.id;
  const filter = { product_id: id };
  const option = {
    path: "storeName",
    select: "storeName",
    strictPopulate: false,
  };
  // query to get data products from collection
  const product = await Products.findOne(filter).populate(option);

  // validator if data exist or not
  if (product) {
    res.status(200).json({
      status: true,
      message: `products dengan id ${id} ditemukan`,
      product,
    });
    return;
  }
  res.status(404).json({
    status: false,
    message: `products dengan id ${id} tidak ditemukan!`,
  });
};

// handler get by categries pada products
export const getProductByCategories = async (req, res) => {
  const { category } = req.params.category;
  const filter = { category };
  const option = {
    path: "storeName",
    select: "storeName",
    strictPopulate: false,
  };
  // query to get data products from collection
  const product = await Products.find(filter).populate(option);

  // validator if data exist or not
  if (product) {
    res.status(200).json({
      status: true,
      message: `products dengan categories ${category} ditemukan`,
      product,
    });
    return;
  }
  res.status(404).json({
    status: false,
    message: `products dengan categories ${category} tidak ditemukan!`,
  });
};

// handler method put pada product
export const updateProductById = async (req, res) => {
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
  } = req.body;
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
    },
  };

  // validate if product exist or not
  const findProduct = await Products.findOne(filter);

  // validator update profile by id
  if (findProduct) {
    try {
      await Products.findOneAndUpdate(filter, update);
    } catch (err) {
      const errors = productCustomError(err);
      res.status(400).json({
        status: false,
        message: "Product gagal diperbarui",
        reason: errors,
      });
      return;
    }

    const updatedProduct = await Products.findOne(filter);
    res.status(200).json({
      status: true,
      message: "product berhasil diperbarui",
      data: updatedProduct,
    });
    return;
  }
  res.status(404).json({
    status: false,
    message: "product tidak ditemukan",
  });
};

// handler method delete by id pada products
export const deleteProductById = async (req, res) => {
  const { id } = req.params.id;
  const filter = { product_id: id };

  // validate if data exist or not
  const product = await Products.findOne(filter);

  if (product) {
    try {
      await Products.deleteOne(filter);
      // response success
      res.status(204).json({
        status: true,
        message: `product with id ${id} successfully deleted`,
      });
      return;
    } catch (err) {
      console.log(err);
      // response server error
      res.status(400).json({
        status: false,
        message: "product gagal diperbarui",
        reason: err,
      });
      return;
    }
  }

  // response not found
  res.status(404).json({
    status: false,
    message: `product with id ${id} not found!`,
  });
};
