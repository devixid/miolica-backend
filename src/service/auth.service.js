import mongoose from "mongoose";
import catchAsync from "@/utils/catchAsync";
import { authCustomError } from "@/utils/errors";
import { Users } from "@/models/users";
import { createToken } from "@/utils/token";

export const signup = catchAsync(async (body) => {
  // 1) catch all request data from body params into variabel
  const { username, email, password, name, address } = body;

  // 2) grap all request variabel into docs
  const signUpDocs = new Users({
    users_id: new mongoose.Types.ObjectId(),
    username,
    email,
    password,
    name,
    address,
  });

  // 3) saving docs into collection
  try {
    await signUpDocs.save();
    return {
      statusCode: 201,
      status: true,
      message: "data berhasil diinput",
      user: signUpDocs,
    };
  } catch (err) {
    // 4) validate process if docs failed to save
    const errors = authCustomError(err);

    return {
      statusCode: 400,
      status: false,
      message: "data gagal diinput",
      errors,
    };
  }
});

export const login = catchAsync(async (email, password) => {
  const filter = { email };
  const projection = { _id: 0, users_id: 1, email: 1, password: 1 };
  // 1) find user by email
  const user = await Users.findOne(filter, projection);

  try {
    if (user) {
      // 2) check if password match
      const authPassword = await bcript.compare(password, user.password);
      if (authPassword) {
        // 3) generate cookie token & option
        const token = createToken(user.users_id);
        const cookieOption = { htpOnly: true, maxAge: maxAge * 1000 };

        return {
          statusCode: 200,
          status: true,
          message: "Login berhasil",
          user,
          token,
          cookieOption,
        };
      }
      throw Error("Password incorrect"); // error if password doesn't match
    }
    throw Error("Email incorrect"); // error if email doesn't match
  } catch (err) {
    // 4) validate if email or password wrong
    const errors = authCustomError(err);

    return {
      statusCode: 400,
      status: false,
      message: "Login belum berhasil",
      errors,
    };
  }
});

export const forgotPassword = catchAsync(async (email, username, password) => {
  // 1) check if user input an email instead of username
  if (email) {
    const filter = { email };
    const update = { $set: { password } };
    const projection = { _id: 0, users_id: 1, email: 1, password: 1 };
    // 2) find user by email
    const findEmail = await Users.findOne(filter);
    if (findEmail) {
      try {
        // 3) update password user by email
        await Users.findOneAndUpdate(filter, update);
      } catch (err) {
        // 4) check if change password fail
        const errors = authCustomError(err);
        return {
          statusCode: 400,
          status: false,
          message: "password gagal diperbarui",
          errors,
        };
      }

      // 5) return if update password success
      const updatedUser = await Users.findOne(filter, projection);
      return {
        statusCode: 201,
        status: true,
        message: `user dengan email ${email} berhasil diperbarui`,
        updatedUser,
      };
    }
    // 6) return if user with that email not found
    return {
      statusCode: 404,
      status: false,
      message: `user dengan email ${email} tidak ditemukan`,
    };
  }

  // 1) check if user input an username instead of email
  if (username) {
    const filter = { username };
    const update = { $set: { password } };
    const projection = { _id: 0, users_id: 1, username: 1, password: 1 };
    // 2) find user by username
    const findUsername = await Users.findOne(filter);
    if (findUsername) {
      try {
        // 3) update password user by username
        await Users.findOneAndUpdate(filter, update);
      } catch (err) {
        // 4) check if change password fail
        const errors = authCustomError(err);
        return {
          statusCode: 400,
          status: false,
          message: "password gagal diperbarui",
          errors,
        };
      }

      // 5) return if update password success
      const updatedUser = await Users.findOne(filter, projection);
      return {
        statusCode: 201,
        status: true,
        message: `user dengan username ${username} berhasil diperbarui`,
        updatedUser,
      };
    }
    // 6) return if user with that username not found
    return {
      statusCode: 404,
      status: false,
      message: `user dengan username ${username} tidak ditemukan`,
    };
  }
});
