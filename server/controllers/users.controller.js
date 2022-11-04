import bcrypt from "bcrypt";
import { User } from "../model/user/user.model.js";

//sign up , POST , /users/signup
export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!req.body) throw new Error("Invalid fields");

  let existingUser;

  try {
    existingUser = await User.findOne({ email });

    if (existingUser) {
      const err = new Error("User already exists");
      return next(err);
    }
  } catch (error) {
    res.send(error.message);
  }

  try {
    const user = User(req.body);
    await user.save();
    res.send({ user });
  } catch (error) {
    res.send(error);
  }
};

//login , POST , /users/login
export const login = async (req, res) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
    if (!existingUser) throw new Error("Something went wrong");

    if (!(existingUser.password === password))
      throw new Error("Something went wrong");

    res.send(existingUser);
  } catch (error) {
    res.send(error.message);
  }
};
