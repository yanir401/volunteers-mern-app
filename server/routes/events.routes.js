import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getUserEvents,
  joinVolunteering,
  leaveVolunteering,
} from "../controllers/event.controller.js";
import { login } from "../controllers/users.controller.js";
import { auth } from "../middleware/authMiddleware.js";

export const eventsRouter = Router();

eventsRouter.get("/", getAllEvents);

//events created by the user
eventsRouter.get("/my-events", auth, getUserEvents);

//users attends events
// eventsRouter.get("/attend-events", getUserEvents);

eventsRouter.post("/", createEvent);

// eventsRouter.patch("/", updateEvent);

eventsRouter.delete("/:id", deleteEvent);

eventsRouter.patch("/join-volunteering", auth, joinVolunteering);
eventsRouter.patch("/leave-volunteering", auth, leaveVolunteering);
