import React from "react";
import { Link } from "react-router-dom";
import Card from "../UIElements/card/Card";

const EventItem = ({ event }) => {
  console.log(event);
  return (
    <Link to={`/event/${event._id}`} state={{ event }}>
      <Card>
        <div style={{ width: "100%", color: "black", height: "200px" }}>
          <img
            src={event.image}
            alt=""
            width={"100%"}
            height="100%"
            style={{ borderRadius: "5px 5px 0 0 " }}
          />
        </div>
        <div
          style={{ background: "#babfcc", height: "100%", paddingTop: "1rem" }}
        >
          <p>{event.eventName}</p>
          <p>{event.description}</p>
          <p>{event.time}</p>
        </div>
      </Card>
    </Link>
  );
};

export default EventItem;
