import { Users } from "@/models/users";
// fetch id from handler login getUser
import { login } from "./auth";

const userId = login.user.users_id;

// handler method get pada profile
export const getProfileById = async (req, res) => {
  const filter = { users_id: userId };
  const projection = { _id: 0, cart: 0, wishlist: 0, password: 0 };
  // query to get data profile from collection
  const profile = await Users.findOne(filter, projection);

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
  const filter = { users_id: userId };
  const projection = { _id: 0, cart: 0, wishlist: 0, password: 0 };
  const update = {
    $set: {
      username,
      email,
      name,
      address,
      photoProfile,
      saldo,
    },
  };

  // validate if profile exist or not
  const findProfile = await Users.findOne(filter);

  // validator update profile by id
  if (findProfile) {
    Users.updateOne(filter, update);
    const updatedProfile = await Users.findOne(filter, projection);
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
