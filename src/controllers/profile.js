import { Users } from "@/models";
// fetch id from handler login getUser
import { login } from "./auth";

const id = login().getUser().data.users_id;

// handler method get pada profile
const profile = (req, res) => {
  const { username } = req.body;
  // query to get data profile from collection
  const getProfileByUsername = async () => {
    const data = await Users.findOne({
      username: {
        $eq: username,
      },
    })
      .populate("Wishlist.productName", "productName")
      .populate("Wishlist.unitPrice", "unitPrice")
      .populate("Wishlist.category", "category")
      .populate(
        "Cart.product_id",
        " productName",
        "descriptionProduct",
        "photoProduct",
        "unitPrice",
        "address",
        "location",
        "QuantityProduct",
      )
      .populate("Cart.product_id.itemCategory", "Category")
      .populate("Cart.product_id.storeName", "storeName");
    return data;
  };
  getProfileByUsername();

  // validator if data exist or not
  if (!getProfileByUsername().data) {
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
      data: getProfileByUsername().data,
    })
    .status(200);
};
profile();

// handler untuk update profile
const updateProfileById = (req, res) => {
  const {
    username,
    email,
    name,
    address,
    wishlist,
    cart,
    photoProfile,
    saldo,
  } = req.body;

  // validator update password by id
  if (id) {
    Users.updateOne({
      $set: {
        username,
        email,
        name,
        address,
        wishlist,
        cart,
        photoProfile,
        saldo,
      },
    });
    res
      .json({
        status: true,
        message: `user dengan id ${id} berhasil diperbarui`,
        data: Users,
      })
      .status(200);
  } else {
    res
      .json({
        status: false,
        message: `user dengan id ${id} tidak ditemukan`,
      })
      .status(404);
  }
};
updateProfileById();
