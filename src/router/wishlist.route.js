import { Router } from "express";
import { jwtAuth } from "@/middleware/authMiddleware";
import {
  addWishlist,
  getWishlist,
  deleteWishlistById,
} from "@/controllers/wishlist";

const routes = Router();

routes
  .all(jwtAuth)
  .get(getWishlist)
  .post(addWishlist)
  .delete(deleteWishlistById);

export default routes;
