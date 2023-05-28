import { Users } from "@/models/users";
import mongoose from "mongoose";
// fetch id from handler login getUser
import { login } from "./auth";

const userId = login.user.users_id;

// handler method post put pada cart
export const addCart = async (req, res) => {
  // take data from req body
  const { product_id, quantity, totalPrice } = req.body;

  const cart = [
    {
      product_id,
      cart_id: new mongoose.Types.ObjectId(),
      quantity,
      totalPrice,
    },
  ];

  const findCart = await Users.findOne({ "cart.cart_id": cart.cart_id });

  // logic to add cart
  if (findCart == null) {
    try {
      const filter = { users_id: userId };
      const update = { $set: cart };
      await Users.updateOne(filter, update);
      // response success
      res.status(200).json({
        status: true,
        message: "cart berhasil ditambahkan",
      });
      return;
    } catch (err) {
      console.log(err);
      // response server error
      res.status(500).json({
        status: false,
        message: "cart gagal ditambahkan",
        reason: err,
      });
    }
  }
};

// handler method put pada cart
export const updateCart = async (req, res) => {
  // take data from req body
  const { product_id, quantity, totalPrice } = req.body;

  const cart = [
    {
      product_id,
      cart_id: new mongoose.Types.ObjectId(),
      quantity,
      totalPrice,
    },
  ];

  const findCart = await Users.findOne({ "cart.cart_id": cart.cart_id });

  // logic to update cart
  if (findCart) {
    try {
      const filter = { "cart.cart_id": cart.cart_id };
      const update = { $set: cart };
      Users.updateOne(filter, update);
      // response success
      res.status(200).json({
        status: true,
        message: "cart berhasil diperbarui",
        data: findCart,
      });
      return;
    } catch (err) {
      console.log(err);
      // response server error
      res.status(500).json({
        status: false,
        message: "cart gagal diperbarui",
        reason: err,
      });
    }
  }
};

// handler method get pada cart
export const getCart = async (req, res) => {
  // query to get data cart from collection
  const projection = { _id: 0, cart: 1 };
  const option = {
    path: "product_id",
    select: [
      "productName",
      "descriptionProduct",
      "photoProduct",
      "unitPrice",
      "category",
    ],
    strictPopulate: false,
  };
  const cart = await Users.findOne({}, projection).populate(option);

  // validator if data exist or not
  if (cart == null) {
    res.status(404).json({
      status: false,
      message: "user belum menambahkan cart apapun",
    });
    return;
  }
  res.status(200).json({
    status: true,
    message: "cart ditemukan",
    cart,
  });
};

// handler method delete pada cart
export const deleteCartById = async (req, res) => {
  const { cart_id } = req.body;
  // search data from collection based on cart_id
  try {
    const filter = { cart: { $elemMatch: { cart_id } } };
    const update = { $unset: { cart: "" } };
    await Users.updateOne(filter, update);
    // response success
    res.status(200).json({
      status: true,
      message: "data cart berhasil dihapus",
    });
    return;
  } catch (err) {
    console.log(err);
    // response server error
    res.status(500).json({
      status: false,
      message: "cart gagal dihapus",
      reason: err,
    });
  }
};
