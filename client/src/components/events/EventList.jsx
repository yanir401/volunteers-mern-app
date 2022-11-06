import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import EventItem from "./EventItem";

const EventList = () => {
  const [error, loading, sendRequest] = useFetch();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest("http://localhost:5000/events", "GET");
        setEvents(res.data);
        console.log(res.data);
      } catch (err) {}
    };
    fetchData();
  }, [sendRequest]);

  const renderEvents = events.map((event) => (
    <EventItem key={event._id} event={event} />
  ));

  return <>{renderEvents}</>;
};

export default EventList;
