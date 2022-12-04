import { Router } from "express";
import {
  getUserProfile,
  login,
  signup,
  updateProfile,
} from "../controllers/users.controller.js";
import { auth } from "../middleware/auth.js";
// import { authMiddleware } from "../../server/middleware/authMiddleware.js";

export const usersRouter = Router();

usersRouter.post("/signup", signup);

usersRouter.post("/login", login);

// usersRouter.get("/profile", getUserProfile);
usersRouter.get("/profile", auth, getUserProfile);

// usersRouter.patch("/profile", updateProfile);
usersRouter.patch("/profile", auth, updateProfile);
