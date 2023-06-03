import { Router } from "express";
import { jwtAuth } from "@/middleware/authMiddleware";
import { anyFile } from "@/utils/multers";
import {
  addProduct,
  getAllProducts,
  getProductById,
  getProductByCategories,
  updateProductById,
  deleteProductById,
} from "@/controllers/products";

const routes = Router();

routes.get(getAllProducts).post(jwtAuth, anyFile("photoProduct"), addProduct);
routes.route("/:categories").get(getProductByCategories);
routes
  .route("/:id")
  .get(getProductById)
  .put(jwtAuth, anyFile("photoProduct"), updateProductById)
  .delete(jwtAuth, deleteProductById);

export default routes;
