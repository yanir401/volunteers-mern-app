import React from "react";
import Card from "../UIElements/card/Card";

const EventItem = ({ event }) => {
  return (
    <Card>
      <div style={{ width: "100%" }}>
        <img
          src={event.image}
          alt=""
          width={"100%"}
          height="200px"
          style={{ borderRadius: "5px 5px 0 0 " }}
        />
      </div>
      <p>{event.eventName}</p>
      <p>{event.description}</p>
      <p>{event.time}</p>
    </Card>
  );
};

export default EventItem;
