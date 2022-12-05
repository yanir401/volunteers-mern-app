import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "../../hooks/useFetch";
import { fetchEvents } from "../../store/actions/eventsAction";
import EventsList from "../events/EventList";
import FilteringAside from "../filteringAside/FilteringAside";
import Aside from "../layout/aside/Aside";
import Spinner from "../UIElements/spinner/Spinner";
const Events = () => {
  const [error, loading, sendRequest] = useFetch();
  const dispatch = useDispatch();
  const [events, setEvents] = useState([]);
  const { events: storedEvents } = useSelector((state) => state.events);
  console.log(storedEvents);
  const { user, tempCoordinates, distance } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    console.log(!storedEvents);
    if (!storedEvents) {
      console.log("run me me me");
      const fetchData = async () => {
        try {
          const res = await sendRequest("/events", "GET");
          setEvents(res.data);
          dispatch(fetchEvents(res.data));
        } catch (err) {}
      };
      fetchData();
    } else setEvents(storedEvents);
  }, [sendRequest]);

  const distanceCalc = (userCoordinates, eventCoordinates, event) => {
    if (userCoordinates && eventCoordinates) {
      const R = 6371e3; // metres
      const φ1 = (userCoordinates.lat * Math.PI) / 180; // φ, λ in radians
      const φ2 = (eventCoordinates.lat * Math.PI) / 180;
      const Δφ = ((eventCoordinates.lat - userCoordinates.lat) * Math.PI) / 180;
      const Δλ = ((eventCoordinates.lng - userCoordinates.lng) * Math.PI) / 180;

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const d = (R * c) / 1000; // in km
      if (distance === 200) return event;
      if (d <= distance) {
        event["distance"] = d.toFixed();
        console.log(event);
        return event;
      }
    }
  };

  const filteredEvents = events?.filter((event) => {
    if (distance === 0) return event;
    const userCoordinates = tempCoordinates || user?.coordinates;
    // // console.log(query);
    if (userCoordinates)
      return distanceCalc(userCoordinates, event.coordinates, event);
    return event;
  });

  const eventsComponent = (
    <div className="grid grid-col-70-30">
      <div
        className="flex flex-col text-center "
        style={{ paddingTop: "10rem" }}
      >
        <h2>Chose your volunteering</h2>

        {filteredEvents.length === 0 ? (
          <Spinner />
        ) : (
          <div className="grid-events-container gap-1 font-16 events-container">
            <EventsList events={filteredEvents} />
          </div>
        )}
      </div>
      <Aside>
        <FilteringAside />
      </Aside>
    </div>
  );
  return eventsComponent;
};

export default Events;
