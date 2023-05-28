import { Users } from "@/models/users";
import mongoose from "mongoose";
import { sign } from "jsonwebtoken";

// handler when user sending incorrect data
const authCustomError = (err) => {
  console.log(err.message, err.code);
  const errors = {
    username: "",
    email: "",
    password: "",
    name: "",
    address: "",
  };

  // email error
  if (err.message === "Email incorrect") {
    errors.email = "Email not registered";
  }

  // password error
  if (err.message === "Password incorrect") {
    errors.password = "incorrect password";
  }

  // duplicate error message
  if (err.code === 11000) {
    errors.email =
      "This email has already been registered, please use another email";
    return errors;
  }

  // validation error message
  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

// jwt cookie
const maxAge = 3 * 24 * 60 * 60;
const createToken = (userId) => {
  return sign({ userId }, "devix token secret", { expiresIn: maxAge });
};

// handler user signup method post
export const signup = async (req, res) => {
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
  try {
    await signUpDocs.save();
    res.status(201).json({
      status: true,
      message: "data berhasil diinput",
      data: signUpDocs,
    });
    return;
  } catch (err) {
    // validate if data not right
    const errors = authCustomError(err);

    res.status(400).json({
      status: false,
      message: "data gagal diinput",
      reason: errors,
    });
  }
};

// handler user login method get
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.userLogin(email, password);
    const token = createToken(user.users_id);
    res
      .status(200)
      .cookie("jwt", token, { htpOnly: true, maxAge: maxAge * 1000 })
      .json({
        status: true,
        message: "Login berhasil",
        data: user,
      });
    return;
  } catch (err) {
    const errors = authCustomError(err);

    res.status(400).json({
      status: false,
      message: "Login belum berhasil",
      reason: errors,
    });
  }
};

// handler update password user method put
export const updatePassword = async (req, res) => {
  const { email, username, password } = req.body;

  // validator update password by email
  if (email) {
    const filter = { email };
    const update = { $set: { password } };
    const projection = { _id: 0, users_id: 1, email: 1, password: 1 };
    const findEmail = await Users.findOne(filter);
    if (findEmail) {
      try {
        await Users.findOneAndUpdate(filter, update);
      } catch (err) {
        const errors = authCustomError(err);
        // response server / client error
        res.status(400).json({
          status: false,
          message: "password gagal diperbarui",
          reason: errors,
        });
        return;
      }

      const updatedUser = await Users.findOne(filter, projection);
      // response success
      res.status(200).json({
        status: true,
        message: `user dengan email ${email} berhasil diperbarui`,
        data: updatedUser,
      });
      return;
    }
    // response client error
    res.status(404).json({
      status: false,
      message: `user dengan email ${email} tidak ditemukan`,
    });
    return;
  }

  // validator update password by username
  if (username) {
    const filter = { username };
    const update = { $set: { password } };
    const projection = { _id: 0, users_id: 1, username: 1, password: 1 };
    const findUsername = await Users.findOne(filter);
    if (findUsername) {
      try {
        await Users.findOneAndUpdate(filter, update);
      } catch (err) {
        const errors = authCustomError(err);
        // response server error
        res.status(400).json({
          status: false,
          message: "password gagal diperbarui",
          reason: errors,
        });
        return;
      }

      const updatedUser = await Users.findOne(filter, projection);
      // response success
      res.status(200).json({
        status: true,
        message: `user dengan username ${username} berhasil diperbarui`,
        data: updatedUser,
      });
      return;
    }
    // response client error
    res.status(404).json({
      status: false,
      message: `user dengan username ${username} tidak ditemukan`,
    });
  }
};

export const logout = (req, res) => {
  res.cookie("jwt", "", { htpOnly: true, maxAge: 1 }).redirect("/");
};
