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
    const userEvents = await Event.find({
      volunteers: mongoose.Types.ObjectId(req.user._id),
    })
      .populate("author")
      .exec();
    // .exec();
    // .populate("Users")
    // .exec();
    // .execPopulate();
    console.log(userEvents.author);
    res.send(userEvents);
  } catch (error) {
    res.send(error);
  }
};

export const createEvent = async (req, res) => {
  const eventBody = req.body.formFields;
  if (!eventBody.image)
    eventBody.image =
      "https://img.freepik.com/free-vector/people-volunteering-donating-money_53876-66112.jpg?w=1060&t=st=1668262843~exp=1668263443~hmac=e6cda460e605c3719b497d5ea9e025eabefe3b3a9e42a3e104ab3d1f005476cb";
  console.log("bodyData", req.body);
  const author = req.body.author;

  try {
    const event = new Event({ ...eventBody, author });
    const newEvent = await event.save();
    console.log({ newEvent });
    res.send(newEvent);
  } catch (error) {
    console.log({ error });
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

export const joinVolunteering = async (req, res, next) => {
  const { user, event } = req.body;

  if (!mongoose.Types.ObjectId.isValid(event._id)) {
    //create static function
    const error = new Error("Event not found");
    return next(error);
  }

  try {
    const existingEvent = await Event.findById(event._id);
    if (!existingEvent) throw new Error("Event not found");

    const isAlreadyVolunteering = existingEvent.volunteers.find(
      (volunteer) => volunteer._id.toString() === user._id
    );

    let eventToUpdate;

    if (!isAlreadyVolunteering) {
      eventToUpdate = await Event.findByIdAndUpdate(
        event._id,
        {
          $addToSet: { volunteers: user._id },
        },
        { new: true }
      );
    } else {
      res.status(400);
      const err = new Error("Your already volunteering to this event");
      return next(err);
    }

    const updatedEvent = await eventToUpdate.save();

    res.send(updatedEvent);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const leaveVolunteering = async (req, res, next) => {
  const { user, event } = req.body;

  if (!mongoose.Types.ObjectId.isValid(event._id)) {
    //create static function
    const error = new Error("Event not found");
    return next(error);
  }

  try {
    const existingEvent = await Event.findById(event._id);
    if (!existingEvent) throw new Error("Event not found");

    const isVolunteering = existingEvent.volunteers.find(
      (volunteer) => volunteer._id.toString() === user._id
    );

    let eventToUpdate;
    console.log(!isVolunteering);

    if (!isVolunteering) {
      res.status(400);
      const err = new Error("Your not volunteering to this event");
      return next(err);
    } else {
      eventToUpdate = await Event.findByIdAndUpdate(
        event._id,
        {
          $pull: { volunteers: user._id },
        },
        { new: true }
      );
    }

    const updatedEvent = await eventToUpdate.save();

    res.send(updatedEvent);
  } catch (error) {
    res.status(400).send(error);
  }
};
