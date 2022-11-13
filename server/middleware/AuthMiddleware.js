import jws from "jsonwebtoken";
import { User } from "../model/user/user.model.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    const decoded = jws.verify(token, "lookingForMyNewRole");
    const user = await User.findById(decoded._id);

    if (!user) throw new Error("Please authenticate");

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};
