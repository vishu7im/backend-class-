import express from "express";
import { index } from "../controller/main.js";
import { middleware } from "../middleware/midle.js";

export const router = express.Router();

router.get("/", middleware, index);
