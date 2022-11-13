import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "../../hooks/useFetch";
import { fetchEvents } from "../../store/actions/eventsAction";
import EventsList from "../events/EventList";
import Spinner from "../UIElements/spinner/Spinner";
const Events = () => {
  // const dispatch = useDispatch();

  const { events } = useSelector((state) => state.events);
  console.log("🚀 ~ file: Events.jsx ~ line 11 ~ Events ~ events", events);

  // const [events, setEvents] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await sendRequest("http://localhost:5000/events", "GET");
  //       setEvents(res.data);
  //       dispatch(fetchEvents(res.data));
  //     } catch (err) {}
  //   };
  //   fetchData();
  // }, [sendRequest]);

  const eventsComponent = (
    <div
      className="center"
      style={{
        paddingTop: "10rem",
        flexDirection: "column",
      }}
    >
      <h2>Chose your volunteering</h2>
      <div style={{ minHeight: "80rem" }}>
        {!events ? (
          <Spinner />
        ) : (
          <div
            className="grid-col-3 gap-2 font-16"
            style={{ padding: "4rem 0" }}
          >
            <EventsList events={events} />
          </div>
        )}
      </div>
    </div>
  );
  return eventsComponent;
};

export default Events;
