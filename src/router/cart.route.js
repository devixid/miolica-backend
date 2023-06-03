import { Router } from "express";
import { jwtAuth } from "@/middleware/authMiddleware";
import {
  addCart,
  updateCartById,
  getAllCart,
  deleteCartById,
} from "@/controllers/cart";

const routes = Router();

routes
  .all(jwtAuth)
  .get(getAllCart)
  .post(addCart)
  .put(updateCartById)
  .delete(deleteCartById);

export default routes;
