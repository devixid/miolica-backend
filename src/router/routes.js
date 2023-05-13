import { Router } from "express";
import {
  addCart,
  updateCart,
  getCart,
  deleteCartById,
} from "@/controllers/cart";
import {
  addWishlist,
  updateWishlist,
  getWishlist,
  deleteWishlistById,
} from "@/controllers/wishlist";
import {
  addProduct,
  getAllProducts,
  getProductById,
  getProductByCategories,
  updateProductById,
  deleteProductById,
} from "@/controllers/products";
import { signup, login, updatePassword } from "../controllers/auth";

const routes = Router();

// register & login page
routes.route("/users/auth").get(login).post(signup).patch(updatePassword);

// cart page
routes
  .route("/users/profile/cart")
  .get(getCart)
  .post(addCart)
  .put(updateCart)
  .delete(deleteCartById);

// wishlist page
routes
  .route("/users/profile/wishlist")
  .get(getWishlist)
  .post(addWishlist)
  .put(updateWishlist)
  .delete(deleteWishlistById);

// product page
routes.route("/products").get(getAllProducts).post(addProduct);
routes.route("/product/:categories").get(getProductByCategories);
routes
  .route("/product/:id")
  .get(getProductById)
  .put(updateProductById)
  .delete(deleteProductById);

export { routes };
