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
  getProductByName,
  getProductByCategories,
  updateProduct,
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

routes
  .route("/products")
  //.get(getAllProducts)
  //.get(getProductByCategories)
  .get(getProductByName)
  .post(addProduct)
  .put(updateProduct);

export { routes };
