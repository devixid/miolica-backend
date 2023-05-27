import { Users } from "@/models/users";
import mongoose from "mongoose";
// fetch id from handler login getUser
import { login } from "./auth";

const userId = login.user.users_id;

// handler method post pada cart
export const addWishlist = async (req, res) => {
  // take data from req body
  const { product_id } = req.body;

  const wishlist = [
    {
      wishlist_id: new mongoose.Types.ObjectId(),
      product_id,
    },
  ];

  // validator if wishlist exist or not
  const findWishlist = await Users.findOne({
    "wishlist.wishlist_id": wishlist.wishlist_id,
  });

  // logic to add wishlist
  if (findWishlist == null) {
    try {
      await Users.updateOne(
        { users_id: userId },
        {
          $set: wishlist,
        },
      );
      // response success
      res.status(200).json({
        status: true,
        message: "wishlist berhasil ditambahkan",
      });
      return;
    } catch (err) {
      console.log(err);
      // response server error
      res.status(500).json({
        status: false,
        message: "wishlist gagal ditambahkan",
        reason: err,
      });
    }
  }
};

// handler method get pada wishlist
export const getWishlist = async (req, res) => {
  // query to get data wishlist from collection
  const wishlist = await Users.findOne({}).populate({
    path: "product_id",
    select: ["productName", "descriptionProduct", "photoProduct", "unitPrice"],
    strictPopulate: false,
  });

  // validator if data exist or not
  if (wishlist == null) {
    res.status(404).json({
      status: false,
      message: "user belum menambahkan wishlist apapun",
    });
    return;
  }
  res.status(200).json({
    status: true,
    message: "wishlist ditemukan",
    wishlist,
  });
};

// handler method get pada cart
export const deleteWishlistById = async (req, res) => {
  const { wishlist_id } = req.body;
  // search data from collection based on wishlist_id
  try {
    await Users.updateOne(
      {
        wishlist: { $elemMatch: { wishlist_id } },
      },
      { $unset: { wishlist: "" } },
    );
    // response success
    res.status(200).json({
      status: true,
      message: "data wishlist berhasil dihapus",
    });
    return;
  } catch (err) {
    console.log(err);
    // response server error
    res.status(500).json({
      status: false,
      message: "wishlist gagal dihapus",
      reason: err,
    });
  }
};
