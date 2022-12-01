import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFetch } from "../../hooks/useFetch";
import EventsList from "../events/EventList";
import Spinner from "../UIElements/spinner/Spinner";
const SubscriptionEvents = () => {
  const { user } = useSelector((state) => state.user);
  const [subscriptionEvents, setSubscriptionEvents] = useState();

  const [error, loading, sendRequest, clearError] = useFetch();

  useEffect(() => {
    userEvents();
  }, []);

  const userEvents = async () => {
    const url = "http://localhost:5000/events/my-events";

    try {
      const response = await sendRequest(
        url,
        "GET",
        {},
        {
          Authorization: `Bearer ${user.tokens[0].token}`,
        }
      );
      console.log(response.data);
      setSubscriptionEvents(response.data);
      // if (response.status === 200) setSubmitted(true);
    } catch (err) {
      console.log(err);
      console.log(error);
    }
  };
  // req.header("Authorization").replace("Bearer ", "");
  return (
    <div className="events-container text-center">
      <h2>Your upcoming volunteering</h2>
      <div className="flex center gap-3 font-16 ">
        {subscriptionEvents ? (
          <EventsList events={subscriptionEvents} />
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default SubscriptionEvents;
