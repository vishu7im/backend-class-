//controllers
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { user } from "../DB/auth.js";

export const user_create = async (req, res) => {
  //code
  const { name, username, pwd, email, mobile } = req.body;
  try {
    // for encription
    const hash = await bcrypt.hash(pwd, 10);
    try {
      //for user add
      const data = new user({ name, username, pwd: hash, email, mobile });
      await data.save();
      res.status(200).json({ msg: "user create" });
    } catch (error) {
      res.status(409).json({ msg: error });
    }
  } catch (error) {
    res.status(409).json({ msg: error });
  }
};

// login

export const login = async (req, res) => {
  //code
  const { username, pwd } = req.body;

  try {
    const data = await user.findOne({ username });
    if (data) {
      try {
        const hash = await bcrypt.compare(pwd, data.pwd);
        if (hash) {
          const token = jwt.sign({ id: data._id }, process.env.PRIVATE_KEY);
          res.status(200).json({ msg: "Authorized", token: token });
        } else {
          res.status(401).json({ msg: "Unauthorized" });
        }
      } catch (error) {
        res.status(409).json({ msg: error });
      }
    } else {
      res.status(401).json({ msg: "Unauthorized" });
    }
  } catch (error) {
    res.status(409).json({ msg: error });
  }
};

export const change = async (req, res) => {
  //code
  const { oldpwd, newpwd } = req.body;
  try {
    const data = await user.findOne({ _id: req.user.id });
    try {
      const hash = await bcrypt.compare(oldpwd, data.pwd);
      if (hash) {
        try {
          const hashpwd = await bcrypt.hash(newpwd, 10);
          try {
            await user.findByIdAndUpdate(
              { _id: req.user.id },
              { pwd: hashpwd }
            );
            res.status(200).json({ msg: "pwd changed" });
          } catch (error) {
            res.status(500).json({ msg: error });
          }
        } catch (error) {
          res.status(402).json({ msg: "Unauthorized" });
        }
      } else {
        res.status(402).json({ msg: "Unauthorized" });
      }
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  } catch (error) {
    res.status(500).json({ msg: "Unauthorized" });
  }
};
