import { Users } from "@/models/users";
// fetch id from handler login getUser
import { login } from "./auth";

const userId = login.user.users_id;

// handler method get pada profile
export const getProfileById = async (req, res) => {
  // query to get data profile from collection
  const profile = await Users.findOne(
    {
      users_id: userId,
    },
    { _id: 0, cart: 0, wishlist: 0, password: 0 },
  );

  // validator if data exist or not
  if (profile == null) {
    res.status(404).json({
      status: false,
      message: "profile tidak ditemukan!",
    });
    return;
  }
  res.status(200).json({
    status: true,
    message: "profile ditemukan",
    profile,
  });
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
      { _id: 0, cart: 0, wishlist: 0, password: 0 },
    );
    res.status(200).json({
      status: true,
      message: "profile berhasil diperbarui",
      data: updatedProfile,
    });
    return;
  }
  res.status(200).json({
    status: false,
    message: "profile tidak ditemukan",
  });
};
