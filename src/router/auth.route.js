import { Router } from "express";
import { signup, login, forgotPassword, logout } from "../controllers/auth";

const routes = Router();

routes.get("/login", login);
routes.patch("/password", forgotPassword);
routes.get("/logout", logout);
routes.post("/signup", signup);

export default routes;
