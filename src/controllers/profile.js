import { Users } from "@/models";
// fetch id from handler login getUser
import { login } from "./auth";

const userId = login().data.users_id;

// handler method get pada profile
export const getProfileByUsername = async (req, res) => {
  // query to get data profile from collection
  const data = await Users.findOne(
    {
      users_id: userId,
    },
    { cart: 0, wishlist: 0 },
  );

  // validator if data exist or not
  if (data == null) {
    res
      .json({
        status: false,
        message: "profile tidak ditemukan!",
      })
      .status(404);
    return;
  }
  res
    .json({
      status: true,
      message: "profile ditemukan",
      data,
    })
    .status(200);
};

// handler untuk update profile
export const updateProfileById = async (req, res) => {
  const { username, email, name, address, photoProfile, saldo } = req.body;

  // validate if profile exist or not
  const findProfile = await Users.findOne({
    users_id: userId,
  });

  // validator update profile by id
  if (findProfile) {
    Users.updateOne(
      { users_id: userId },
      {
        $set: {
          username,
          email,
          name,
          address,
          photoProfile,
          saldo,
        },
      },
    );
    const updatedProfile = await Users.findOne(
      { users_id: userId },
      { cart: 0, wishlist: 0 },
    );
    res
      .json({
        status: true,
        message: "profile berhasil diperbarui",
        data: updatedProfile,
      })
      .status(200);
    return;
  }
  res
    .json({
      status: false,
      message: "profile tidak ditemukan",
    })
    .status(404);
};
