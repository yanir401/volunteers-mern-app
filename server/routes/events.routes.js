import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEvent,
  getUpComingEvents,
  getUserEvents,
  joinVolunteering,
  leaveVolunteering,
} from "../controllers/event.controller.js";
import { login } from "../controllers/users.controller.js";
// import { authMiddleware } from "../middleware/authMiddleware.js";

export const eventsRouter = Router();

eventsRouter.get("/", getAllEvents);
eventsRouter.get("/upcoming-events", getUpComingEvents);

//events created by the user
eventsRouter.get("/my-events", getUserEvents);
// eventsRouter.get("/my-events", authMiddleware, getUserEvents);

eventsRouter.get("/event/:id", getEvent);

//users attends events
// eventsRouter.get("/attend-events", getUserEvents);

eventsRouter.post("/", createEvent);
// eventsRouter.post("/", authMiddleware, createEvent);

// eventsRouter.patch("/", updateEvent);

eventsRouter.delete("/:id", deleteEvent);

eventsRouter.patch("/join-volunteering", joinVolunteering);
// eventsRouter.patch("/join-volunteering", authMiddleware, joinVolunteering);
// eventsRouter.patch("/leave-volunteering", authMiddleware, leaveVolunteering);
eventsRouter.patch("/leave-volunteering", leaveVolunteering);
