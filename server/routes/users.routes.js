import { Router } from "express";
import {
  getUserProfile,
  login,
  signUp,
} from "../controllers/users.controller.js";

export const usersRouter = Router();

usersRouter.post("/signup", signUp);

usersRouter.post("/login", login);

usersRouter.get("/profile", getUserProfile);

usersRouter.patch("/profile", login);
