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
    return res
      .json({
        status: true,
        message: "data berhasil diinput",
      })
      .status(200);
  };
  save();
};

// handler user login method get
export const login = async (req, res) => {
  const { email, username, password } = req.body;

  // query to get data user from collection
  const data = await Users.find({
    $and: [
      {
        $or: [{ username: { $eq: username } }, { email: { $eq: email } }],
      },
      {
        password: { $eq: password },
      },
    ],
  });

  // validator if data exist or not
  if (!data.value) {
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

// handler update password user method put
export const updatePassword = async (req, res) => {
  const { email, /* username, */ password } = req.body;
  // validator if email or usernme exist or not
  const findEmail = await Users.findOne({ email: { $eq: email } });
  // const findUsername = await Users.findOne({ username: { $eq: username } });

  if (findEmail) {
    Users.updateOne({
      $set: {
        password,
      },
    });
    res
      .json({
        status: true,
        message: `user dengan email ${email} berhasil diperbarui`,
        data: findEmail,
      })
      .status(200);
  } else if (findEmail == null) {
    res
      .json({
        status: false,
        message: `user dengan email ${email} tidak ditemukan`,
      })
      .status(404);
  }
  /*
  else if (findUsername) {
    Users.updateOne({
      $set: {
        password,
      },
    });
    res
      .json({
        status: true,
        message: `user dengan username ${username} berhasil diperbarui`,
        data: findUsername,
      })
      .status(200);
  } else if (!findUsername) {
    res
      .json({
        status: false,
        message: `user dengan username ${username} tidak ditemukan`,
      })
      .status(404);
  }
*/
  // validator update password by email
  /* if (!findEmail.value) {
    res
      .json({
        status: false,
        message: `user dengan email ${email} tidak ditemukan`,
      })
      .status(404);
  } else {
    Users.updateOne({
      $set: {
        password,
      },
    });
    res
      .json({
        status: true,
        message: `user dengan email ${email} berhasil diperbarui`,
        data: findEmail,
      })
      .status(200);
  }

  // validator update password by username
  if (!findUsername.value) {
    res
      .json({
        status: false,
        message: `user dengan username ${username} tidak ditemukan`,
      })
      .status(404);
  } else {
    Users.updateOne({
      $set: {
        password,
      },
    });
    res
      .json({
        status: true,
        message: `user dengan username ${username} berhasil diperbarui`,
        data: findUsername,
      })
      .status(200);
  } */
};
