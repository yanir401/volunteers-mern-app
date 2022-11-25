import React from "react";
import { useSelector } from "react-redux";
import EventsList from "../events/EventList";
import FilteringAside from "../filteringAside/FilteringAside";
import Aside from "../layout/aside/Aside";
import Spinner from "../UIElements/spinner/Spinner";
const Events = () => {
  const { events, query = "" } = useSelector((state) => state.events);
  const { user, tempCoordinates, distance } = useSelector(
    (state) => state.user
  );

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
      if (d <= distance) return event;
    }
  };

  // const filteredEventsBySearch = () =>
  //   setFilteredEvents(
  //     filteredEvents?.filter(
  //       ({ title, description, address, coordinates }, index) => {
  //         return (
  //           title.toLowerCase().includes(query.toLowerCase()) ||
  //           description.toLowerCase().includes(query.toLowerCase()) ||
  //           address.toLowerCase().includes(query.toLowerCase())
  //         );
  //       }
  //     )
  //   );

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

        {!filteredEvents ? (
          <Spinner />
        ) : (
          <div className="grid-col-4 gap-2 font-16 events-container">
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
