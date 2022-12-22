// api
import express from "express";
import { login, user_create } from "../controller/auth.js";
import { Authorization } from "../middleware/auth.js";

export const auth = express.Router();

auth.post("/create", user_create);
auth.post("/login", login);

// random

auth.get("/", Authorization, (req, res) => {
  // get feild
  console.log(req.vishal);
  res.send("hiii");
});
