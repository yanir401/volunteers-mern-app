import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getUserEvents,
} from "../controllers/event.controller.js";
import { login, signUp } from "../controllers/users.controller.js";

export const eventsRouter = Router();

eventsRouter.get("/", getAllEvents);

//events created by the user
eventsRouter.get("/my-events:uid", getUserEvents);

//users attends events
// eventsRouter.get("/attend-events", getUserEvents);

eventsRouter.post("/", createEvent);

// eventsRouter.patch("/", updateEvent);

eventsRouter.delete("/:id", deleteEvent);

// eventsRouter.patch("/profile", login);
