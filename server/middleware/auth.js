import jws from "jsonwebtoken";
import { User } from "../model/user/user.model.js";

export const auth = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    console.log(token);
    if (!token) throw new Error("Please authenticate");

    token = token.replace("Bearer ", "");

    const decoded = jws.verify(token, "lookingForMyNewRole");
    const user = await User.findById(decoded._id);

    if (!user) throw new Error("Please authenticate");

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: error.message });
    // res.status(401).send(error);
  }
};
