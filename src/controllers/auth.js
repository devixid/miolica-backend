import { authService } from "@/service"; // service
import catchAsync from "@/utils/catchAsync";

// handler user signup method post
export const signup = catchAsync(async (req, res) => {
  // 1) catch all return from authService signup into variabel
  const { statusCode, status, message, user, errors } =
    await authService.signup(req.body);

  // 2) validate if status variabel value false
  if (status === false) {
    return res.status(statusCode).json({
      status,
      message,
      reason: errors,
    });
  }

  // 3) response if signup success
  return res.status(statusCode).json({
    status,
    message,
    user,
  });
});

// handler user login method get
export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // 1) catch all return from authService login into variabel
  const { statusCode, status, message, user, token, cookieOption, errors } =
    await authService.login(email, password);

  // 2) validate if return variabel contain errors variabel
  if (status === false) {
    return res.status(statusCode).json({
      status,
      message,
      reason: errors,
    });
  }

  // 3) response if login success
  return res.status(statusCode).cookie("jwt", token, cookieOption).json({
    status,
    message,
    user,
  });
});

// handler update password user method put
export const forgotPassword = catchAsync(async (req, res) => {
  const { email, username, password } = req.body;

  // 1) catch all return from authService forgotPassword into variabel
  const { statusCode, status, message, errors, updatedUser } =
    authService.forgotPassword(email, username, password);

  if (email && status === true) {
    return res.status(statusCode).json({
      status,
      message,
      updatedUser,
    });
  } else if (email && status === false) {
    return res.status(statusCode).json({
      status,
      message,
      reason: errors,
    });
  } else if (username && status === true) {
    return res.status(statusCode).json({
      status,
      message,
      updatedUser,
    });
  } else if (username && status === false) {
    return res.status(statusCode).json({
      status,
      message,
      reason: errors,
    });
  }
});

export const logout = (req, res) => {
  res.cookie("jwt", "", { htpOnly: true, maxAge: 1 }).redirect("/");
};
