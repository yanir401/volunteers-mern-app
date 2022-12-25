import { Router } from "express";
import {
  login,
  signup,
  updateProfile,
} from "../controllers/users.controller.js";
import { auth } from "../middleware/auth.js";

export const usersRouter = Router();

usersRouter.post("/signup", signup);

usersRouter.post("/login", login);

usersRouter.patch("/profile", auth, updateProfile);
