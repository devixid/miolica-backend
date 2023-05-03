import { Router } from "express";
import { addCart, getCartById, deleteCartById } from "@/controllers/cart";
import { signup, login, updatePassword } from "../controllers/auth";

const routes = Router();

// register & login page
routes.route("/users/auth").get(login).post(signup).put(updatePassword);

// cart page
routes
  .route("/users/auth")
  .get(getCartById)
  .post(addCart)
  .put(addCart)
  .delete(deleteCartById);

export { routes };
