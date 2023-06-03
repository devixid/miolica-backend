import { cartService } from "@/service";

// handler method post put pada cart
export const addCart = catchAsync(async (req, res) => {
  const { statusCode, status, message, cart, errors } = cartService.addCart(
    req.body,
  );

  if (status == false) {
    return res.status(statusCode).json({
      status,
      message,
      reason: errors,
    });
  }
  return res.status(statusCode).json({
    status,
    message,
    cart,
  });
});

// handler method put pada cart
export const updateCartById = catchAsync(async (req, res) => {
  const { statusCode, status, message, cart, errors } =
    cartService.updateCartById(req.body);

  if (status == false) {
    return res.status(statusCode).json({
      status,
      message,
      reason: errors,
    });
  }
  return res.status(statusCode).json({
    status,
    message,
    cart,
  });
});

// handler method get pada cart
export const getAllCart = catchAsync(async (req, res) => {
  const { users_id } = req.body;
  const { statusCode, status, message, carts, errors } =
    cartService.getAllCart(users_id);

  if (status == false) {
    return res.status(statusCode).json({
      status,
      message,
      reason: errors,
    });
  }
  return res.status(statusCode).json({
    status,
    message,
    carts,
  });
});

// handler method delete pada cart
export const deleteCartById = catchAsync(async (req, res) => {
  const { cart_id } = req.body;
  const { statusCode, status, message, errors } =
    cartService.getAllCart(users_id);

  if (status == false) {
    return res.status(statusCode).json({
      status,
      message,
      reason: errors,
    });
  }
  return res.status(statusCode).json({
    status,
    message,
  });
});
