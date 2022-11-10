import bcrypt from "bcrypt";
import { User } from "../model/user/user.model.js";

//sign up , POST , /users/signup
export const signUp = async (req, res, next) => {
  console.log("object");
  console.log(req.body);
  const { name, email, password } = req.body;

  if (!req.body) throw new Error("Invalid fields");

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      console.log("sssssss");
      res.status(400);
      const err = new Error("User already exists");
      return next(err);
    }
  } catch (error) {
    res.send(error.message);
  }
  console.log("here");
  try {
    const user = new User(req.body);
    console.log(user, "ssa");
    const isUserSaved = await user.save();
    console.log("hi");
    console.log();
    console.log({ isUserSaved });
    res.send({ user });
  } catch (error) {
    // console.log(object);
    // res.status(400).send(error);
    res.status(403).send(error);
  }
};

//login , POST , /users/login
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
    if (!existingUser) throw new Error("Something went wrong");
    console.log("object");

    if (!(existingUser.password === password))
      throw new Error("Something went wrong");

    res.send(existingUser);
  } catch (error) {
    res.json(error.message);
    // res.json("error");
  }
};

export const getUserProfile = async (req, res) => {
  const { uid } = req.body;
  console.log(uid);
  try {
    const userProfile = await User.findById(uid);
    if (!userProfile) throw new Error("Something went wrong");

    res.send(userProfile);
  } catch (error) {
    res.send(error.message);
  }
};
