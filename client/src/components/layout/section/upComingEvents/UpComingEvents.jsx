import React from "react";
import EventList from "../../../events/EventList";
import "./upComingEvents.css";
const UpComingEvents = () => {
  return (
    <div className="paddingTb-2 upcoming-events">
      <div className="container">
        <h2 className="center paddingTb-2" style={{ color: "#F8B24F" }}>
          Upcoming Events
        </h2>
        <div className="grid-col-3 font-16">
          <EventList limit={3} />
        </div>
      </div>
    </div>
  );
};

export default UpComingEvents;
