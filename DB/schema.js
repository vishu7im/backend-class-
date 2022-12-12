import mongoose from "mongoose";

const USER = new mongoose.Schema({
  name: String,
  username: {
    unique: true,
    type: String,
  },
  pwd: String,
});

export const user = mongoose.model("user", USER);
