import { Router } from "express";
import { jwtAuth } from "@/middleware/authMiddleware";
import {
  addCart,
  updateCart,
  getCart,
  deleteCartById,
} from "@/controllers/cart";

const routes = Router();

routes
  .all(jwtAuth)
  .get(getCart)
  .post(addCart)
  .put(updateCart)
  .delete(deleteCartById);

export default routes;
