import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "../../hooks/useFetch";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { updateUserEvents } from "../../store/actions/eventsAction";
import EventsList from "../events/EventList";
import Spinner from "../UIElements/spinner/Spinner";
const SubscriptionEvents = () => {
  const { user } = useSelector((state) => state.user);
  const [subscriptionEvents, setSubscriptionEvents] = useState();
  const [value, setValue] = useLocalStorage("user-events", "");
  const dispatch = useDispatch();

  const [error, loading, sendRequest, clearError] = useFetch();

  useEffect(() => {
    if (!value) userEvents();
    else setSubscriptionEvents(value);
  }, [subscriptionEvents]);

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
        <div className="grid-events-container center gap-2 font-16 text-center paddingT-1 ">
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
    <div className="text-center events-container">
      <h2>Your upcoming volunteering</h2>
      {renderSubscriptionEvents()}
    </div>
  );
};

export default SubscriptionEvents;
