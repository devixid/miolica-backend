import { Users } from "@/models/users";
import catchAsync from "@/utils/catchAsync";
import { authCustomError } from "@/utils/errors";

export const getProfileById = catchAsync(async (id) => {
  const users_id = id;
  const filter = { users_id };
  const projection = { _id: 0, cart: 0, wishlist: 0, password: 0 };
  // 1) find profile user by id
  const profile = await Users.findOne(filter, projection);

  // 2) check if there's no profile
  if (profile == null) {
    return {
      statusCode: 404,
      status: false,
      message: "profile tidak ditemukan!",
    };
  }
  // 3) return if profile found
  return {
    statusCode: 200,
    status: true,
    message: "profile ditemukan",
    profile,
  };
});

export const updateProfileById = catchAsync(async (body, file) => {
  // 1) catch all request data from body and file params into variabel
  const { users_id, username, email, name, address, saldo } = body;
  const photoProfile = file.path;
  const filter = { users_id };
  const projection = { _id: 0, cart: 0, wishlist: 0, password: 0 };
  // 2) grap all request variabel into update option
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

  // 3) check if profile exist or not
  const findProfile = await Users.findOne(filter);

  // 4) next step if profile exist
  if (findProfile) {
    try {
      await Users.updateOne(filter, update);
      const updatedProfile = await Users.findOne(filter, projection);
      // 6) return if update profile success
      return {
        statusCode: 201,
        status: true,
        message: "Profile berhasil diperbarui",
        profile: updatedProfile,
      };
    } catch (err) {
      const errors = authCustomError(err);
      // 6) return if update profile fail
      return {
        statusCode: 400,
        status: false,
        message: "Profile gagal diperbarui",
        errors,
      };
    }
  }
  // 6) return if profile not exist
  return {
    statusCode: 404,
    status: false,
    message: "Profile tidak ditemukan",
  };
});
