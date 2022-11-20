import bcrypt from "bcrypt";
import { User } from "../model/user/user.model.js";

//sign up , POST , /users/signup
export const signup = async (req, res, next) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      const err = new Error("User already exists");
      return next(err);
    }

    const user = new User(req.body);
    await user.generateToke();

    const isUserSaved = await user.save();

    res.send(isUserSaved);

    // res.send(userExists);
  } catch (error) {
    // console.log(object);
    // res.status(400).send(error);
    res.status(400).send({ error: error.message });
  }
};

//login , POST , /users/login
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);

    if (user instanceof Error) {
      res.status(400);
      const err = new Error(user.message);
      return next(err);
    }

    await user.generateToke();

    res.send({ user });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getUserProfile = (req, res) => {
  // const user = req.user.getPublicProfile();
  res.send(req.user);

  // try {
  //   const userProfile = await User.findById(uid);
  //   if (!userProfile) throw new Error("Something went wrong");

  //   res.send(userProfile);
  // } catch (error) {
  //   res.send(error.message);
  // }
};

//GET ALL USERS

//POST user events

//Delete user events
