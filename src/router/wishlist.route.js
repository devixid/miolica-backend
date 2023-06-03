import { Router } from "express";
import { jwtAuth } from "@/middleware/authMiddleware";
import {
  addWishlist,
  getAllWishlistById,
  deleteWishlistById,
} from "@/controllers/wishlist";

const routes = Router();

routes
  .all(jwtAuth)
  .get(getAllWishlistById)
  .post(addWishlist)
  .delete(deleteWishlistById);

export default routes;
