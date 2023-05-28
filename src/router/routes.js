import { Router } from "express";
import { jwtAuth } from "@/middleware/authMiddleware";
import {
  addCart,
  updateCart,
  getCart,
  deleteCartById,
} from "@/controllers/cart";
import {
  addWishlist,
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
  .get(jwtAuth, getCart)
  .post(jwtAuth, addCart)
  .put(jwtAuth, updateCart)
  .delete(jwtAuth, deleteCartById);

// wishlist page
routes
  .route("/users/profile/wishlist")
  .get(jwtAuth, getWishlist)
  .post(jwtAuth, addWishlist)
  .delete(jwtAuth, deleteWishlistById);

// product page
routes.route("/products").get(getAllProducts).post(addProduct);
routes.route("/product/:categories").get(getProductByCategories);
routes
  .route("/product/:id")
  .get(getProductById)
  .put(jwtAuth, updateProductById)
  .delete(jwtAuth, deleteProductById);

export { routes };
