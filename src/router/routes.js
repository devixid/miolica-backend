import { Router } from "express";
import { signup, login, updatePassword } from "../controllers/auth";

const routes = Router();

// register page
routes.route("/users/auth").get(login).post(signup).put(updatePassword);

export { routes };
