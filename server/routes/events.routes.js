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
  uploadImage,
} from "../controllers/event.controller.js";
import { login } from "../controllers/users.controller.js";
import { auth } from "../middleware/auth.js";
import { multerMiddleware } from "../middleware/multerMiddleware.js";
// import { authMiddleware } from "../middleware/authMiddleware.js";

export const eventsRouter = Router();

eventsRouter.get("/", getAllEvents);
eventsRouter.get("/upcoming-events", getUpComingEvents);

//events created by the user
eventsRouter.get("/my-events", auth, getUserEvents);

eventsRouter.get("/event/:id", getEvent);

//users attends events
// eventsRouter.get("/attend-events", getUserEvents);

// eventsRouter.post(
//   "/",
//   [auth, multerMiddleware.single("eventImage")],
//   (req, res, next) => {
//     console.log(req.file);
//     console.log(req.body);
//   }
// ),
//   (error, req, res, next) => {
//     res.status(400).send({ error: error.message });
//   };
eventsRouter.post(
  "/",
  auth,
  multerMiddleware.single("eventImage"),
  createEvent
),
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  };

// eventsRouter.post(
//   "/upload",
//   [auth, multerMiddleware.single("eventImage")],
//   uploadImage,
//   (error, req, res, next) => {
//     res.status(400).send({ error: error.message });
//   }
// );

// eventsRouter.patch("/", updateEvent);

eventsRouter.delete("/:id", deleteEvent);

eventsRouter.patch("/join-volunteering", auth, joinVolunteering);
eventsRouter.patch("/leave-volunteering", auth, leaveVolunteering);
