import { signup, login, forgotPassword } from "./auth.service";
import { getProfileById, updateProfileById } from "./profile.service";
import {
  addProduct,
  getAllProducts,
  getProductById,
  getProductByCategories,
  updateProductById,
  deleteProductById,
} from "./product.service";
import {
  addCart,
  getAllCart,
  updateCartById,
  deleteCartById,
} from "./cart.service";
import {
  addWishlist,
  getAllWishlistById,
  deleteWishlistById,
} from "./wishlist.service";

const authService = {
  signup,
  login,
  forgotPassword,
};

const profileService = {
  getProfileById,
  updateProfileById,
};

const productService = {
  addProduct,
  getAllProducts,
  getProductById,
  getProductByCategories,
  updateProductById,
  deleteProductById,
};

const cartService = {
  addCart,
  getAllCart,
  updateCartById,
  deleteCartById,
};

const wishlistService = {
  addWishlist,
  getAllWishlistById,
  deleteWishlistById,
};

export { authService, profileService, productService, cartService, wishlistService };
