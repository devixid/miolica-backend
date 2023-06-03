import catchAsync from "@/utils/catchAsync";
import { Users } from "@/models/users";
import mongoose from "mongoose";

export const addCart = catchAsync(async (body) => {
  const { users_id, product_id, quantity, totalPrice } = body;
  const filter = { users_id };
  const update = { $set: { cart: cartDocs } };

  const cartDocs = [
    {
      product_id,
      cart_id: new mongoose.Types.ObjectId(),
      quantity,
      totalPrice,
    },
  ];

  try {
    const cart = await Users.updateOne(filter, update);
    return {
      statusCode: 200,
      status: true,
      message: "cart berhasil ditambahkan",
      cart,
    };
  } catch (errors) {
    console.log(errors);
    // response server error
    return {
      statuCode: 500,
      status: false,
      message: "cart gagal ditambahkan",
      errors,
    };
  }
});

export const updateCartById = catchAsync(async (body) => {
  const { cart_id, product_id, quantity, totalPrice } = body;
  const filter = { "cart.cart_id": cart_id };
  const update = { $set: cart };

  const cart = [
    {
      product_id,
      cart_id,
      quantity,
      totalPrice,
    },
  ];

  const findCart = await Users.findOne(filter);

  if (findCart) {
    try {
      const updatedCart = await Users.updateOne(filter, update);
      return {
        statusCode: 200,
        status: true,
        message: "cart berhasil diperbarui",
        cart: updatedCart,
      };
    } catch (errors) {
      console.log(errors);
      // response server error
      return {
        statusCode: 500,
        status: false,
        message: "cart gagal diperbarui",
        errors,
      };
    }
  }
  return {
    statusCode: 404,
    status: false,
    message: "Cart tidak ditemukan",
  };
});

export const getAllCart = catchAsync(async (id) => {
  const filter = { users_id: id };
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
  const carts = await Users.findOne(filter, projection).populate(option);

  if (carts == null) {
    return {
      statusCode: 404,
      status: false,
      message: "user belum menambahkan cart apapun",
    };
  }
  return {
    statusCode: 200,
    status: true,
    message: "cart ditemukan",
    carts,
  };
});

export const deleteCartById = catchAsync(async (id) => {
  const filter = { cart: { $elemMatch: { cart_id: id } } };
  const update = { $unset: { cart: "" } };
  try {
    await Users.updateOne(filter, update);
    return {
      statusCode: 200,
      status: true,
      message: "data cart berhasil dihapus",
    };
  } catch (errors) {
    console.log(errors);
    return {
      statusCode: 500,
      status: false,
      message: "cart gagal dihapus",
      errors,
    };
  }
});
