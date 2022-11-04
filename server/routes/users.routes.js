import { Router } from "express";
import { login, signUp } from "../controllers/users.controller.js";

export const usersRouter = Router();

usersRouter.post("/signup", signUp);

usersRouter.post("/login", login);

usersRouter.get("/profile", login);

usersRouter.patch("/profile", login);
