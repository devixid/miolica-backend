/* eslint-disable import/no-cycle */
import mongoose from "mongoose";
// validator tabel
import { usersSchema } from "./users";
import { sellerSchema } from "./sellers";
import { buyerSchema } from "./buyers";
import { addressesSchema } from "./addresses";
import { productSchema } from "./products";
import { shopSchema } from "./shops";
import { checkoutSchema } from "./checkouts";
import { shippingSchema } from "./shippings";

// pembuatan tabel
export const Users = mongoose.model("Users", usersSchema);
export const Sellers = mongoose.model("Sellers", sellerSchema);
export const Buyers = mongoose.model("Buyers", buyerSchema);
export const Addresses = mongoose.model("Address", addressesSchema);
export const Products = mongoose.model("Products", productSchema);
export const Shops = mongoose.model("Shops", shopSchema);
export const Checkouts = mongoose.model("Checkouts", checkoutSchema);
export const Shippings = mongoose.model("Shippings", shippingSchema);
