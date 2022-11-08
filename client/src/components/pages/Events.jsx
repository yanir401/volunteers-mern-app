import React from "react";
import EventsList from "../events/EventList";
const Events = () => {
  return (
    <>
      <div
        className="center"
        style={{ paddingTop: "10rem", flexDirection: "column" }}
      >
        <h2>Chose your volunteering</h2>
        <div className="grid-col-3 gap-4 marginTb-4 font-16">
          <EventsList />
        </div>
      </div>
    </>
  );
};

export default Events;
