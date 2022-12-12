import express from "express";
import { write } from "../controller/main.js";
import { middleware } from "../middleware/midle.js";

export const router = express.Router();

//router.get("/user", index); //read
router.post("/user", write); //write

// router.put("/req/:id", middleware, index);
// router.delete("/req/:id", middleware, index);
