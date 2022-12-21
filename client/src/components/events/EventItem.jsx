import React from "react";
import { Link } from "react-router-dom";
import { Buffer } from "buffer";
import Card from "../UIElements/card/Card";
import "./eventItem.css";
const EventItem = ({ event }) => {
  const img = new Buffer.from(event.file.data).toString("base64");
  return (
    <Link to={`/event/${event._id}`} state={{ event }}>
      <Card>
        <div className="image-container">
          <img
            src={
              img
                ? `data:image/png;base64,${img}`
                : "https://img.freepik.com/free-vector/people-volunteering-donating-money-items_53876-64646.jpg?w=2000"
            }
            alt=""
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
