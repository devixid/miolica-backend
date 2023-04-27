import { Users } from "@/models";
// fetch id from handler login getUser
import { login } from "./auth";

const id = login().getUser().data.users_id;

// handler method get pada profile
const getProfileByUsername = async (req, res) => {
  const { username } = req.body;

  // query to get data profile from collection
  const data = await Users.findOne(
    {
      username: {
        $eq: username,
      },
    },
    { cart: 0, wishlist: 0 },
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
getProfileByUsername();

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
