import { wishlistService } from "@/service";

// handler method post pada cart
export const addWishlist = async (req, res) => {
  const { statusCode, status, message, wishlist, errors } =
    wishlistService.addWishlist(req.body);

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
    wishlist,
  });
};

// handler method get pada wishlist
export const getAllWishlistById = async (req, res) => {
  const { users_id } = req.body;
  const { statusCode, status, message, wishlist } =
    wishlistService.getAllWishlistById(users_id);

  if (status == false) {
    return res.status(statusCode).json({
      status,
      message,
    });
  }
  return res.status(statusCode).json({
    status,
    message,
    wishlist,
  });
};

// handler method get pada cart
export const deleteWishlistById = async (req, res) => {
  const { wishlist_id } = req.body;
  const { statusCode, status, message, errors } =
    wishlistService.deleteWishlistById(wishlist_id);

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
};
