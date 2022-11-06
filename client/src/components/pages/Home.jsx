import React from "react";
import EventList from "../events/EventList";
import Header from "../layout/header/Header";

const Home = () => {
  return (
    <>
      <div className="center marginTb-2 flex flex-row-align-center gap-4 paddingTb-2">
        <h2 className="text-left">
          ONE <br /> BIG <br /> FAMILY
        </h2>
        <p className="font-16 line-height text-left">
          Join us on our mission to create a brighter future.
          <br />
          suscipit odio ea quasi nam ducimus mollitia rerum placeat quos, <br />
          exercitationem expedita ipsum ut minima itaque saepe incidunt. Quae,
          est.
        </p>
        {/* <h2>Upcoming Events</h2> */}
      </div>
      {/* <EventList /> */}
    </>
  );
};

export default Home;
