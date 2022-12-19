import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFetch } from "../../hooks/useFetch";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import EventsList from "../events/EventList";
import Spinner from "../UIElements/spinner/Spinner";
const SubscriptionEvents = () => {
  const {
    user: { user },
    events: { subscriptionEvents: subscriptionStateEvents },
  } = useSelector((state) => state);

  const [subscriptionEvents, setSubscriptionEvents] = useState();
  const [value, setValue] = useLocalStorage("user-events", "");

  const [error, loading, sendRequest, clearError] = useFetch();

  useEffect(() => {
    if (value?.length === 0 || subscriptionStateEvents?.length !== value.length)
      userEvents();
    else setSubscriptionEvents(value);
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
      setValue(response.data);
    } catch (err) {
      console.log(err);
      console.log(error);
    }
  };

  const renderSubscriptionEvents = () => {
    if (subscriptionEvents)
      return (
        <div className="grid-events-container center gap-2 font-16 text-center paddingTb-5 ">
          <EventsList events={subscriptionEvents} />
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
