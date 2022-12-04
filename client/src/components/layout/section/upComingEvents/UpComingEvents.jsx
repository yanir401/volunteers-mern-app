import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import EventList from "../../../events/EventList";
import "./upComingEvents.css";
const UpComingEvents = ({ upComingEvents }) => {
  const { events } = useSelector((state) => state.events);

  return (
    <div className="paddingTb-2 upcoming-events">
      <div className="container">
        <h2 className="center paddingTb-2" style={{ color: "#F8B24F" }}>
          Upcoming Events
        </h2>
        <div className="upcoming-events-grid font-16">
          <EventList events={upComingEvents} limit={4} />
        </div>
      </div>
    </div>
  );
};

export default UpComingEvents;
