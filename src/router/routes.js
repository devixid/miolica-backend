import { Router } from "express";
import { addCart, getCartById, deleteCartById } from "@/controllers/cart";
import {
  addWishlist,
  getWishlistById,
  deleteWishlistById,
} from "@/controllers/wishlist";
import { signup, login, updatePassword } from "../controllers/auth";

const routes = Router();

// register & login page
routes.route("/users/auth").get(login).post(signup).put(updatePassword);

// cart page
routes
  .route("/users/profile/cart")
  .get(getCartById)
  .post(addCart)
  .put(addCart)
  .delete(deleteCartById);

// wishlist page
routes
  .route("/users/profile/wishlist")
  .get(getWishlistById)
  .post(addWishlist)
  .put(addWishlist)
  .delete(deleteWishlistById);

export { routes };
