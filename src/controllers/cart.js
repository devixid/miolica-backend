import { Users } from "@/models";
import mongoose from "mongoose";
// fetch id from handler login getUser
import { login } from "./auth";

const id = login().getUser().data.users_id;

// handler method post dan put pada cart
const addCart = (req, res) => {
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

  const findCart = Users.findIndex(
    (user) => user.cart.cart_id === cart.cart_id,
  );

  // validator update and add cart by cart_id
  if (findCart === undefined) {
    Users.insertOne({
      cart,
    });
    res
      .json({
        status: true,
        message: "cart berhasil ditambahkan!",
        data: Users,
      })
      .status(200);
  } else {
    Users.updateOne({
      cart,
    });
    res
      .json({
        status: true,
        message: `cart dengan id ${cart.cart_id} berhasil diperbarui`,
      })
      .status(200);
  }
  return cart;
};
addCart();

// handler method get pada cart
const getCartById = async (req, res) => {
  // query to get data cart from collection
  const data = await Users.findOne(
    {
      users_id: {
        $eq: id,
      },
    },
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
    " productName",
    "descriptionProduct",
    "photoProduct",
    "unitPrice",
  );

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
getCartById();
