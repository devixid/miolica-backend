import { Users } from "@/models";
import mongoose from "mongoose";
// fetch id from handler login getUser
import { login } from "./auth";

const userId = login().data.users_id;

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
    Users.updateOne(
      { users_id: userId },
      {
        $set: cart,
      },
    );
    res
      .json({
        status: true,
        message: "cart berhasil ditambahkan",
      })
      .status(200);
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
    Users.updateOne(
      { "cart.cart_id": cart.cart_id },
      {
        $set: cart,
      },
    );
    res
      .json({
        status: true,
        message: "cart berhasil diperbarui",
        data: findCart,
      })
      .status(200);
  }
};

// handler method get pada cart
export const getCart = async (req, res) => {
  // query to get data cart from collection
  const data = await Users.findOne(
    {},
    {
      username: 0,
      email: 0,
      password: 0,
      name: 0,
      address: 0,
      wishlist: 0,
      photoProfile: 0,
      saldo: 0,
    },
  ).populate(
    "Products",
    "productName",
    "descriptionProduct",
    "photoProduct",
    "unitPrice",
    "category",
  );

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

// handler method get pada cart
export const deleteCartById = async (req, res) => {
  const { cart_id } = req.body;
  // search data from collection based on cart_id
  const deleteCart = await Users.updateOne(
    {
      cart: { $elemMatch: { cart_id } },
    },
    { $unset: { cart: "" } },
  );

  if (deleteCart) {
    res
      .json({
        status: true,
        message: "data cart berhasil dihapus",
      })
      .status(200);
    return;
  }
  res
    .json({
      status: false,
      message: "data cart gagal dihapus",
    })
    .status(404);
};
