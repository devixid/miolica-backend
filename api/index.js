import express from "express";
import cors from "cors";
import helmet from "helmet";
import { init } from "@/config";

/** @type {Express} */
const app = express();

// middleware
app.use(cors());
app.use(helmet());

init();

app.get("/", (req, res) => {
  res.status(200).json({ code: 200, message: "OK" });
});

app.use("*", (req, res) => {
  res.status(404).json({ code: 404, message: "ups something went wrong" });
});

export default app;
