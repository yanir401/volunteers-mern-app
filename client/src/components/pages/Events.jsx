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
  const [events, setEvents] = useState();
  const { events: storedEvents, query } = useSelector((state) => state.events);
  const { user, tempCoordinates, distance } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (!storedEvents || storedEvents.length === 0) {
      const fetchData = async () => {
        try {
          const res = await sendRequest("/events", "GET");
          console.log(!res.data);
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
        return event;
      }
    }
  };
  const filteredEvents = events?.filter((event) => {
    const userCoordinates = tempCoordinates || user?.coordinates;
    let queryToLowerCase = query?.toLowerCase();

    const queryIncludes =
      event.title.toLowerCase().includes(queryToLowerCase) ||
      event.description.toLowerCase().includes(queryToLowerCase);

    const isEventInRange = distanceCalc(
      userCoordinates,
      event.coordinates,
      event
    );

    if (query && userCoordinates) {
      return queryIncludes && isEventInRange;
    }
    if (query) {
      return queryIncludes;
    }
    if (distance === 0) return event;
    // // console.log(query);
    if (userCoordinates) return isEventInRange;

    return event;
  });

  const eventsComponent = (
    <div className="grid grid-col-70-30">
      <div
        className="flex flex-col text-center "
        style={{ paddingTop: "10rem" }}
      >
        <h2>Chose your volunteering</h2>

        {!filteredEvents ? (
          <Spinner />
        ) : (
          <div className="events-container">
            {filteredEvents.length === 0 ? (
              distance === 0 &&
              !query && (
                <p className="font-20">
                  Currently we don't have events right now. <br />
                  Please try again later or create your own volunteer event.
                </p>
              )
            ) : (
              <div className="grid-events-container gap-2 font-16">
                <EventsList events={filteredEvents} />
              </div>
            )}
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
