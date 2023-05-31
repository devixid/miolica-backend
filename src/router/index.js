import { Router } from "express";

import authRoute from "./auth.route";
import profileRoute from "./profile.route";
import cartRoute from "./cart.route";
import wishlistRoute from "./wishlist.route";
import productsRoute from "./products.route";

const routes = Router();

routes.use("/api/v1/users", authRoute);
routes.use("/api/v1/users/profile", profileRoute);
routes.use("/api/v1/users/profile/cart", cartRoute);
routes.use("/api/v1/users/profile/wishlist", wishlistRoute);
routes.use("/api/v1/products", productsRoute);

export { routes };
