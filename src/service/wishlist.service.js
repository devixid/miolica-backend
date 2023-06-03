import { Users } from "@/models/users";
import mongoose from "mongoose";
import catchAsync from "@/utils/catchAsync";

export const addWishlist = catchAsync(async (body) => {
  const { users_id, product_id } = body;
  const filter = { users_id };
  const update = { $set: { wishlist: wishlistDocs } };

  const wishlistDocs = [
    {
      wishlist_id: new mongoose.Types.ObjectId(),
      product_id,
    },
  ];

  try {
    const wishlist = await Users.updateOne(filter, update);
    return {
      statusCode: 200,
      status: true,
      message: "wishlist berhasil ditambahkan",
      wishlist,
    };
  } catch (errors) {
    console.log(errors);
    return {
      statusCode: 500,
      status: false,
      message: "wishlist gagal ditambahkan",
      errors,
    };
  }
});

export const getAllWishlistById = catchAsync(async (id) => {
  const filter = { users_id: id };
  const projection = { _id: 0, wishlist: 1 };
  const option = {
    path: "product_id",
    select: ["productName", "descriptionProduct", "photoProduct", "unitPrice"],
    strictPopulate: false,
  };
  const wishlist = await Users.findOne(filter, projection).populate(option);

  if (wishlist == null) {
    return {
      statusCode: 404,
      status: false,
      message: "user belum menambahkan wishlist apapun",
    };
  }
  return {
    statusCode: 200,
    status: true,
    message: "wishlist ditemukan",
    wishlist,
  };
});

export const deleteWishlistById = catchAsync(async (id) => {
  const filter = { wishlist: { $elemMatch: { wishlist_id: id } } };
  const update = { $unset: { wishlist: "" } };

  try {
    await Users.updateOne(filter, update);
    return {
      statusCode: 200,
      status: true,
      message: "data wishlist berhasil dihapus",
    };
  } catch (errors) {
    console.log(errors);
    return {
      statusCode: 500,
      status: false,
      message: "wishlist gagal dihapus",
      errors,
    };
  }
});
