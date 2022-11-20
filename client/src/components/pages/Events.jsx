import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "../../hooks/useFetch";
import { fetchEvents } from "../../store/actions/eventsAction";
import EventsList from "../events/EventList";
import Spinner from "../UIElements/spinner/Spinner";
const Events = () => {
  // const dispatch = useDispatch();

  const { events } = useSelector((state) => state.events);

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
    <div className="events-container center flex flex-col">
      <h2>Chose your volunteering</h2>
      <div>
        {!events ? (
          <Spinner />
        ) : (
          <div className="grid-col-3 gap-2 font-16">
            <EventsList events={events} />
          </div>
        )}
      </div>
    </div>
  );
  return eventsComponent;
};

export default Events;
