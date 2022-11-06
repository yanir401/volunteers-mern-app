import mongoose from "mongoose";
import { Event } from "../model/event/event.modal.js";

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.send(events);
  } catch (error) {
    res.send(error.message);
  }
};

export const getUserEvents = async (req, res) => {
  const uid = req.params.uid;

  try {
    const userPlaces = await Event.find({ uid });
    res.send(userPlaces);
  } catch (error) {
    res.send(error);
  }
};

export const createEvent = async (req, res) => {
  const eventBody = req.body;
  console.log("bodyData", req.body);
  const author = req.body.author;

  try {
    const event = new Event({ ...eventBody, author });
    const newEvent = await event.save();
    res.send(newEvent);
  } catch (error) {
    res.send(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  const eventId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    const error = new Error("Event not found");
    return next(error);
  }

  try {
    const existingEvent = await Event.findById(eventId);
    if (!existingEvent) throw new Error("Event not found");

    await Event.findByIdAndDelete(eventId);
    res.send({ message: "The event was successfully deleted" });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};
