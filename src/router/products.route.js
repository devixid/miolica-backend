import { Router } from "express";
import { jwtAuth } from "@/middleware/authMiddleware";
import {
  addProduct,
  getAllProducts,
  getProductById,
  getProductByCategories,
  updateProductById,
  deleteProductById,
} from "@/controllers/products";

const routes = Router();

routes.get(getAllProducts).post(addProduct);
routes.route("/:categories").get(getProductByCategories);
routes
  .route("/:id")
  .get(getProductById)
  .put(jwtAuth, updateProductById)
  .delete(jwtAuth, deleteProductById);

export default routes;
