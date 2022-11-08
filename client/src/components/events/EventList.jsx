import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useFetch } from "../../hooks/useFetch";
import { fetchEvents } from "../../store/actions/eventsAction";
import EventItem from "./EventItem";

const EventList = ({ limit = -1 }) => {
  const dispatch = useDispatch();
  const [error, loading, sendRequest] = useFetch();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest("http://localhost:5000/events", "GET");
        setEvents(res.data);
        dispatch(fetchEvents(res.data));
      } catch (err) {}
    };
    fetchData();
  }, [sendRequest]);

  const renderEvents = events
    .slice(0, limit)
    .map((event) => <EventItem key={event._id} event={event} />);

  return <>{renderEvents}</>;
};

export default EventList;
