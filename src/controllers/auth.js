import { Users } from "@/models";
import mongoose from "mongoose";

// handler user signup method post
export const signup = (req, res) => {
  // take data from req body
  const { username, email, password, name, address } = req.body;

  // input data into docs
  const signUpDocs = new Users({
    users_id: new mongoose.Types.ObjectId(),
    username,
    email,
    password,
    name,
    address,
  });

  // saving docs into collection
  const save = () => {
    signUpDocs.save();
  };
  save();

  // validator
  if (!save()) {
    res
      .json({
        status: false,
        message: "data gagal diinput",
      })
      .status(400);
    return;
  }
  res
    .json({
      status: true,
      message: "data berhasil diinput",
    })
    .status(200);
};

// handler user login method get
export const login = async (req, res) => {
  const { email, username, password } = req.body;

  // query to get data user from collection
  const data = await Users.findOne({
    $or: [{ username }, { email }],
    password,
  });

  // validator if data exist or not
  if (data) {
    res.status(200).json({
      status: true,
      message: "data ditemukan",
      data,
    });
    return;
  }
  res.status(404).json({
    status: false,
    message: "data tidak ditemukan!",
  });
};

// handler update password user method put
export const updatePassword = async (req, res) => {
  const { email, username, password } = req.body;

  // validator update password by email
  if (email) {
    const findEmail = await Users.findOne({ email });
    if (findEmail) {
      await Users.updateOne(
        { email: { $eq: email } },
        {
          $set: {
            password,
          },
        },
      );
      const updatedUser = await Users.findOne({ email });
      res
        .json({
          status: true,
          message: `user dengan email ${email} berhasil diperbarui`,
          data: updatedUser,
        })
        .status(200);
      return;
    }
    res
      .json({
        status: false,
        message: `user dengan email ${email} tidak ditemukan`,
      })
      .status(404);
    return;
  }

  // validator update password by username
  if (username) {
    const findUsername = await Users.findOne({ username });
    if (findUsername) {
      await Users.updateOne(
        {},
        {
          $set: {
            password,
          },
        },
      );
      const updatedUser = await Users.findOne({ username });
      res
        .json({
          status: true,
          message: `user dengan username ${username} berhasil diperbarui`,
          data: updatedUser,
        })
        .status(200);
      return;
    }
    res
      .json({
        status: false,
        message: `user dengan username ${username} tidak ditemukan`,
      })
      .status(404);
  }
};
