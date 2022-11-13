import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Button from "../formElements/buttons/Button";
import Spinner from "../UIElements/spinner/Spinner";

const EventPreview = () => {
  const [event, setEvent] = useState();
  const { state } = useLocation();

  useEffect(() => {
    if (state.event) setEvent(state.event);
    else {
    }
  }, []);

  const { eventId } = useParams();
  console.log(state.event);

  return (
    <>
      {event ? (
        <div
          style={{
            maxWidth: "60%",
            margin: "auto",
            paddingTop: "10rem",
            marginBottom: "2rem",
            height: "70rem",
          }}
          className="flex flex-col gap-3"
        >
          <h2 className="text-center marginTb-2">{event.eventName}</h2>
          <div
            className="grid-col-2  center"
            style={{ alignItems: "center", color: "white" }}
          >
            <div style={{ width: "100%", color: "black", height: "100%" }}>
              <img
                src={event.image}
                alt=""
                width={"100%"}
                height="100%"
                style={{ borderRadius: "5px 0 0 5px " }}
              />
            </div>
            <div
              className="font-18 flex flex-col gap-2 center"
              style={{
                background: "#babfcc",
                height: "100%",
                borderRadius: "0 5px 5px 0 ",
              }}
            >
              <p>
                <span>Description:</span> {event.description}
              </p>
              <p>
                <span>Where: </span>
                {event.address}
              </p>
              <p>When: {event.time}</p>
              <p>{event.date}</p>
              {event?.date && <p>{event.date.toString}</p>}
            </div>
          </div>
          <div className="center marginT-1">
            <Button type="secondary">I want to volunteer</Button>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default EventPreview;
