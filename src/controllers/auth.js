import { Users } from "@/models";
import mongoose from "mongoose";

// handler user signup method post
const signup = (req, res) => {
  const { username, email, password, name, address } = req.body;

  // input data into docs
  const signUpQuery = new Users({
    users_id: new mongoose.Types.ObjectId(),
    username,
    email,
    password,
    name,
    address,
  });

  // saving data into collection
  const save = async () => {
    await signUpQuery.save((error, data) => {
      // message when data not saved
      if (error) res.send(error);

      // message when data successfully saved
      res.send(data);
      res.send("data berhasil diinput");
    });
    return signUpQuery;
  };
  save();
};
// aktifasi handler
signup();

// handler user login
const login = (req, res) => {
  const { email, username, password } = req.body;

  // handler method get data user
  const getUser = async () => {
    // query to search data user from collection
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
    return data;
  };
  getUser();

  if (!getUser().data) return res.send("data tidak ditemukan").status(404); // jika data tidak ditemukan
  return res.send(getUser().data).status(200); // jika data tidak ditemukan
};
login(); // aktifasi handler

// handler update password user
const updatePassword = (req, res) => {
  const { email, username, password } = req.body;
  const findEmail = Users.findIndex((user) => user.email === email);
  const findUsername = Users.findIndex((user) => user.username === username);

  // update password by email
  if (findEmail !== -1) {
    Users.updateOne({
      $set: {
        password,
      },
    });
    res
      .json({
        status: true,
        message: `user dengan email ${email} berhasil diperbarui`,
        data: Users,
        method: req.method,
        url: req.url,
      })
      .status(200);
  } else {
    res
      .json({
        status: false,
        message: `user dengan email ${email} tidak ditemukan`,
      })
      .status(404);
  }

  // update password by username
  if (findUsername !== -1) {
    Users.updateOne({
      $set: {
        password,
      },
    });
    res
      .json({
        status: true,
        message: `user dengan username ${username} berhasil diperbarui`,
        data: Users,
        method: req.method,
        url: req.url,
      })
      .status(200);
  } else {
    res
      .json({
        status: false,
        message: `user dengan username ${username} tidak ditemukan`,
      })
      .status(404);
  }
};
updatePassword(); // aktifasi handler
