import express from "express";
import cors from "cors";
import { router } from "./api/main.js";
import mongoose from "mongoose";
const app = express();
const port = 5000;
const DB = `mongodb://localhost:27017/chandni`;

app.use(cors());
app.use(express.json());

// api
app.use(router);

mongoose.set("strictQuery", true);

// promise
mongoose
  .connect(DB, {
    useNewUrlParser: "true",
  })
  .then(() => {
    app.listen(port, () => {
      console.log("connect");
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
      console.log("connect");
    });
  } catch (error) {
    console.log(error);
  }
};
