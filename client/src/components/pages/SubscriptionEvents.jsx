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
      // if (response.status === 200) setSubmitted(true);
    } catch (err) {
      console.log(err);
      console.log(error);
    }
  };
  // req.header("Authorization").replace("Bearer ", "");
  return (
    <div className="text-center events-container">
      <h2>Your upcoming volunteering</h2>
      {subscriptionEvents ? (
        <div
          className="grid-events-container center gap-2 font-16 text-center"
          style={{ paddingTop: "10rem" }}
        >
          <EventsList events={subscriptionEvents} />
        </div>
      ) : (
        <div className="flex center">
          {" "}
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default SubscriptionEvents;
