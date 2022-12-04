import jws from "jsonwebtoken";
import { User } from "../model/user/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    console.log(req.header("Authorization"));
    const token = req.header("Authorization").replace("Bearer ", "");

    const decoded = jws.verify(token, "lookingForMyNewRole");
    const user = await User.findById(decoded._id);

    if (!user) throw new Error("Please authenticate");

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
};
