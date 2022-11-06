import React from "react";
import Card from "../UIElements/card/Card";

const EventItem = ({ event }) => {
  return (
    <Card>
      <p>{event.eventName}</p>
      <p>{event.description}</p>
      <p>{event.time}</p>
    </Card>
  );
};

export default EventItem;
