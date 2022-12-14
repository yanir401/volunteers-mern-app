import React from "react";
import { Link } from "react-router-dom";
import { Buffer } from "buffer";
import Card from "../UIElements/card/Card";
import "./eventItem.css";
const EventItem = ({ event }) => {
  return (
    <Link to={`/event/${event._id}`} state={{ event }}>
      <Card>
        <div className="image-container">
          <img
            src={
              event.file ||
              "https://volunteering-images.s3.eu-central-1.amazonaws.com/pexels-rodnae-productions-6647060.jpg"
            }
            alt="event-image"
            className="image-event"
          />
        </div>
        <div className="event-content font-18">
          <p className="font-20 bold">{event.title}</p>
          <p>
            <span className="bold">When: </span>{" "}
            {new Date(event.date).toLocaleDateString("en-IL")}
          </p>
          <p>
            <span className="bold">At:</span> {event.time}
          </p>
          <p>
            <span className="bold">Currently volunteering: </span>
            {event?.volunteers?.length}
          </p>
          <p className="km font-16">
            {event.distance && event.distance + " Km from you"}{" "}
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default EventItem;
