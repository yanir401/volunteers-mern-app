import mongoose from "mongoose";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { userSchema } from "./user.schema.js";

//static method

// userSchema.statics.isExistingUser = async (email) => {
//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     throw new Error("User already exists");
//   }

//   return existingUser;
// };

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("Something went wrong");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return new Error("Something went wrong");

  return user;
};

userSchema.methods.generateToke = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user.id.toString() },
    process.env.JWT_TOKEN_SECRET
  );
  user.tokens = [...user.tokens, { token }];
  await user.save();

  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;

  const userObject = user.toObject();

  delete userObject.password;
  // delete userObject.tokens;

  return userObject;
};

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    const password = await bcrypt.hash(user.password, 10);
    user.password = password;
  }

  next();
});

export const User = mongoose.model("Users", userSchema);
