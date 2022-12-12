import { user } from "../DB/schema.js";

export const write = async (req, res) => {
  const { name, pwd, username } = req.body;

  const data = new user({ name, pwd, username });
  try {
    const result = await data.save();
    console.log(result);
    res.status(200).json({ msg: "user create ", data: result });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};
