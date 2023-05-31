import { Router } from "express";
import { jwtAuth } from "@/middleware/authMiddleware";
import { getProfileById, updateProfileById } from "@/controllers/profile";
import { singleFile } from "@/utils/multers";

const routes = Router();

routes
  .all(jwtAuth)
  .get(getProfileById)
  .put(singleFile("photoProfile"), updateProfileById);

export default routes;
