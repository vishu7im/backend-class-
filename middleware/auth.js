import jwt from "jsonwebtoken";
import { user } from "../Db/auth.js";
export const Authorization = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split(" ");
    try {
      const result = await jwt.verify(token[1], process.env.PRIVATE_KEY);
      console.log(result);
      try {
        const data = await user.findOne({ _id: result.id });
        req.user = data;
        next();
      } catch (error) {
        res.status(500).json({ msg: error });
      }
    } catch (error) {
      res.status(401).json({ msg: "unauthorised" });
    }
  } else {
    res.status(401).json({ msg: "unauthorised" });
  }
};
