// api
import express from "express";
import { login, user_create } from "../controller/auth.js";

export const auth = express.Router();

auth.post("/create", user_create);
auth.post("/login", login);
