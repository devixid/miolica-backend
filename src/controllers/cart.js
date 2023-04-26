import { Users } from "@/models";
import mongoose from "mongoose";

const addCart = (req, res) => {
  // take data from req body
  const { quantity, totalPrice } = req.body;

  const cart = [
    {
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
