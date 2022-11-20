import { Router } from "express";
import {
  getUserProfile,
  login,
  signup,
} from "../controllers/users.controller.js";
import { auth } from "../middleware/authMiddleware.js";

export const usersRouter = Router();

usersRouter.post("/signup", signup);

usersRouter.post("/login", login);

usersRouter.get("/profile", auth, getUserProfile);

usersRouter.patch("/profile", login);
