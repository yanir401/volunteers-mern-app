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
          <p>{event.time}</p>
          <p>Currently volunteering: {event?.volunteers?.length}</p>
          <p>{event.distance && event.distance + " Km from you"} </p>
        </div>
      </Card>
    </Link>
  );
};

export default EventItem;
