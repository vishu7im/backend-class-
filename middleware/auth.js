// middleware
import jwt from "jsonwebtoken";

export const Authorization = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split(" ");
    try {
      const result = await jwt.verify(token[1], process.env.PRIVATE_KEY);
      // new feild
      req.vishal = result;
      next();
    } catch (error) {
      res.status(401).json({ msg: "Unauthorized", err: error });
    }
  } else {
    res.status(401).json({ msg: "Unauthorized" });
  }
};
