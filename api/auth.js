// api
import express from "express";
import { user_create } from "../controller/auth.js";

export const auth = express.Router();

auth.post("/create", user_create);
