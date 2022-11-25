import React from "react";
import { Link } from "react-router-dom";
import Card from "../UIElements/card/Card";
import "./eventItem.css";
const EventItem = ({ event }) => {
  return (
    <Link to={`/event/${event._id}`} state={{ event }}>
      <Card>
        <div className="image-container">
          <img src={event.image} alt="" className="image-event" />
        </div>
        <div className="event-content">
          <p className="font-18">{event.title}</p>
          <p>{new Date(event.date).toLocaleDateString("en-IL")}</p>
          <p>{event.description}</p>
          <p>{event.time}</p> {event?.volunteers?.length}
        </div>
      </Card>
    </Link>
  );
};

export default EventItem;
