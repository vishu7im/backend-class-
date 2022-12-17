import mongoose from "mongoose";

const USER = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    unique: true,
  },
  pwd: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
  },
  mobile: {
    type: String,
    unique: true,
  },
});

export const user = mongoose.model("user", USER);
