import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import {
  setUserEvents,
  updateUserEvents,
} from "../../store/actions/eventsAction";
import EventsList from "../events/EventList";
import Spinner from "../UIElements/spinner/Spinner";
const SubscriptionEvents = () => {
  const {
    user: { user },
    events: { subscriptionEvents: subscriptionStateEvents },
  } = useSelector((state) => state);

  const [subscriptionEvents, setSubscriptionEvents] = useState();
  const [value, setValue] = useLocalStorage("user-events", "");
  const dispatch = useDispatch();

  const [error, loading, sendRequest, clearError] = useFetch();

  useEffect(() => {
    // if (value.length === 0 || subscriptionStateEvents?.length !== value.length)
    // if (value.length === 0 || subscriptionStateEvents?.length !== value.length)
    if (subscriptionStateEvents.length === 0) userEvents();
    else setSubscriptionEvents(subscriptionStateEvents);
  }, []);

  const userEvents = async () => {
    const url = "/events/my-events";

    try {
      const response = await sendRequest(
        url,
        "GET",
        {},
        {
          Authorization: `Bearer ${user.tokens[0].token}`,
        }
      );
      setSubscriptionEvents(response.data);
      dispatch(setUserEvents(response.data));
    } catch (err) {
      console.log(err);
      console.log(error);
    }
  };

  const renderSubscriptionEvents = () => {
    if (subscriptionEvents)
      return (
        <div
          className={
            (subscriptionEvents.length <= 1 &&
              " grid-events-container-one-less") +
            " grid-events-container center gap-2 font-16 text-center paddingTb-5"
          }
        >
          {subscriptionEvents.length === 0 ? (
            <p className="font-20">
              You are not registered for volunteer events. <br /> Start
              volunteer{" "}
              <Link to="/events">
                <span style={{ color: "#f8b24f" }} className="bold">
                  here.
                </span>
              </Link>
            </p>
          ) : (
            <EventsList events={subscriptionEvents} />
          )}
        </div>
      );
    else
      return (
        <div className="flex center">
          <Spinner />
        </div>
      );
  };

  return (
    <div className="text-center events-container  events-top-padding ">
      <h2>Your upcoming volunteering</h2>
      {renderSubscriptionEvents()}
    </div>
  );
};

export default SubscriptionEvents;
