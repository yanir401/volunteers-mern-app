import React from "react";

import EventItem from "./EventItem";

const EventList = ({ events, limit = events?.length }) => {
  const renderEvents = (
    <>
      {events &&
        events
          .slice(0, limit)
          .map((event) => <EventItem key={event._id} event={event} />)}
    </>
  );

  return renderEvents;
};

export default EventList;
