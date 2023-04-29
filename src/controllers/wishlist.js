import { Users } from "@/models";
import mongoose from "mongoose";
// fetch id from handler login getUser
import { login } from "./auth";

const userId = login().getUser().data.users_id;

// handler method post dan put pada cart
const addWishlist = (req, res) => {
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
  const findWishlist = Users.find({
    wishlist,
  });

  // validator update and add wishlist by wishlist_id
  if (!findWishlist) {
    Users.insertOne({
      wishlist,
    });
    res
      .json({
        status: true,
        message: "wishlist berhasil ditambahkan!",
        data: Users,
      })
      .status(200);
  } else {
    Users.updateOne({
      wishlist,
    });
    res
      .json({
        status: true,
        message: `wishlist dengan id ${wishlist.wishlist_id} berhasil diperbarui`,
      })
      .status(200);
  }
  return wishlist;
};
addWishlist();

// handler method get pada cart
const getWishlistById = async (req, res) => {
  // query to get data cart from collection
  const data = await Users.findOne({
    users_id: {
      $eq: userId,
    },
  }).populate(
    "Products",
    "productName",
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
getWishlistById();

// handler method get pada cart
const deleteWishlistById = (req, res) => {
  const { wishlist_id } = req.body;
  // search data from collection based on cart_id
  const deleteWishlist = Users.deleteOne({
    cart: { $elemMatch: { wishlist_id } },
  });

  if (!deleteWishlist) {
    return res
      .json({
        status: false,
        message: "data wishlist gagal dihapus",
      })
      .status(404);
  }
  return res
    .json({
      status: true,
      message: "data wishlist berhasil dihapus",
    })
    .status(200);
};
deleteWishlistById();
