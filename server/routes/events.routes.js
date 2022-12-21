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
import { auth } from "../middleware/auth.js";
import { multerMiddleware } from "../middleware/multerMiddleware.js";

export const eventsRouter = Router();

eventsRouter.get("/", getAllEvents);
eventsRouter.get("/upcoming-events", getUpComingEvents);

eventsRouter.get("/my-events", auth, getUserEvents);

eventsRouter.get("/event/:id", getEvent);

eventsRouter.patch("/join-volunteering", auth, joinVolunteering);
eventsRouter.post(
  "/",
  auth,
  multerMiddleware.single("eventImage"),
  createEvent
),
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  };

eventsRouter.delete("/:id", deleteEvent);

eventsRouter.patch("/leave-volunteering", auth, leaveVolunteering);
