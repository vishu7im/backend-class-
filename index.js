import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { auth } from "./api/auth.js";
const app = express();
const port = 5000;
const DB = `mongodb://localhost:27017/chandni`;
//env config
import * as env from "dotenv";
env.config();

app.use(cors());
app.use(express.json());

// auth
app.use("/auth", auth);

mongoose.set("strictQuery", true);

// promise
mongoose
  .connect(DB, {
    useNewUrlParser: "true",
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`https://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// asyn await
const connection = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: "true",
    });
    app.listen(port, () => {
      console.log(`https://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
