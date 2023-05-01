import express from "express";
import cors from "cors";
import helmet from "helmet";
import { init } from "@/config";
import { routes } from "@/router/routes";
import { urlencoded, json } from "body-parser";

/** @type {Express} */
const app = express();

// middleware
app.use(cors());
app.use(helmet());
app.use(urlencoded({ extended: true }));
app.use(json());

init();

app.get("/", (req, res) => {
  res.status(200).json({ code: 200, message: "OK" });
});

app.use(routes);

app.use("*", (req, res) => {
  res.status(404).json({ code: 404, message: "ups something went wrong" });
});

export default app;
