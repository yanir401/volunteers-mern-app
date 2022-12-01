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
    res.status(400).send({ error: "Something went wrong" });
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
      console.log({ err });
      return next(err);
    }

    await user.generateToke();

    res.send({ user });
  } catch (error) {
    res.status(400).send({ error: "Something went wrong" });
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

//update profile , PATCH , /users/profile
export const updateProfile = async (req, res) => {
  const updates = Object.keys(req.body);
  //maybe check if valid properties to update?

  console.log({ updates });
  if (!req.user) {
    res.status(400);
    const err = new Error("Something went wrong please try again later");
    return next(err);
  }

  try {
    updates.forEach((field) => {
      req.user[field] = req.body[field];
    });

    const user = await req.user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
};

//GET ALL USERS

//POST user events

//Delete user events
