import { profileService } from "@/service";
import catchAsync from "@/utils/catchAsync";

// handler method get pada profile
export const getProfileById = catchAsync(async (req, res) => {
  const { users_id } = req.body;
  const { statusCode, status, message, profile } =
    profileService.getProfileById(users_id);

  if (status === false) {
    return res.status(statusCode).json({
      status,
      message,
    });
  }
  return res.status(statusCode).json({
    status,
    message,
    profile,
  });
});

// handler untuk update profile
export const updateProfileById = catchAsync(async (req, res) => {
  const { statusCode, status, message, updatedProfile } =
    profileService.updateProfileById(req.body, req.file);

  if (status === false) {
    return res.status(statusCode).json({
      status,
      message,
    });
  }
  return res.status(statusCode).json({
    status,
    message,
    updatedProfile,
  });
});
