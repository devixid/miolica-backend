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
}

export { authService, profileService, productService };
