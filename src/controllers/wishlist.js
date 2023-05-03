import { Users } from "@/models";
import mongoose from "mongoose";
// fetch id from handler login getUser
import { login } from "./auth";

const userId = login().data.users_id;

// handler method post dan put pada cart
export const addWishlist = async (req, res) => {
  // take data from req body
  const { productName, descriptionProduct, photoProduct, unitPrice, category } =
    req.body;

  const wishlist = [
    {
      cart_id: new mongoose.Types.ObjectId(),
      productName,
      descriptionProduct,
      photoProduct,
      unitPrice,
      category,
    },
  ];

  // validator if wishlist exist or not
  const findWishlist = await Users.findOne({
    "wishlist.wishlist_id": wishlist.wishlist_id,
  });

  // logic to add wishlist
  if (findWishlist == null) {
    Users.updateOne(
      {
        users_id: userId,
      },
      {
        $set: wishlist,
      },
    );
    res
      .json({
        status: true,
        message: "wishlist berhasil ditambahkan!",
      })
      .status(200);
    return;
  }
  // logic to update cart
  Users.updateOne(
    {
      "wishlist.wishlist_id": wishlist.wishlist_id,
    },
    {
      $set: wishlist,
    },
  );
  res
    .json({
      status: true,
      message: "wishlist berhasil diperbarui",
    })
    .status(200);
};

// handler method get pada wishlist
export const getWishlistById = async (req, res) => {
  // query to get data wishlist from collection
  const data = await Users.findOne({
    users_id: userId,
  }).populate(
    "Products",
    "productName",
    "descriptionProduct",
    "photoProduct",
    "unitPrice",
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
export const deleteWishlistById = (req, res) => {
  const { wishlist_id } = req.body;
  // search data from collection based on wishlist_id
  const deleteWishlist = Users.deleteOne({
    cart: { $elemMatch: { wishlist_id } },
  });

  if (deleteWishlist) {
    res
      .json({
        status: true,
        message: "data wishlist berhasil dihapus",
      })
      .status(200);
    return;
  }
  res
    .json({
      status: false,
      message: "data wishlist gagal dihapus",
    })
    .status(404);
};
