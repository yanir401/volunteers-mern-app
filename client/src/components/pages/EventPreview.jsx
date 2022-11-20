import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { ModalContext } from "../../context/modalContext";
import { useFetch } from "../../hooks/useFetch";
import { updateEventsList } from "../../store/actions/eventsAction";
import AuthenticationWrapper from "../authentication/AuthenticationWrapper";
import EventItemPreview from "../events/eventPreview/EventItemPreview";
import Spinner from "../UIElements/spinner/Spinner";

const EventPreview = () => {
  const { openModal } = useContext(ModalContext);
  const { user } = useSelector((state) => state.user);
  const [error, loading, sendRequest, clearError] = useFetch();
  const [submittedMsg, setSubmittedMsg] = useState("");
  const [event, setEvent] = useState();
  const [buttonMode, setButtonMode] = useState("I want to volunteer");
  const { state } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(state);
    if (state.event) setEvent(state.event);
    // else {
    // }

    if (user && isUserAlreadyVolunteering())
      setButtonMode("Leave volunteering");

    console.log({ error });
  }, [error]);

  const isUserAlreadyVolunteering = () => {
    return !!state.event.volunteers.find((id) => id === user._id);
  };

  const handleOnClick = async () => {
    let url = "http://localhost:5000/events/join-volunteering";
    if (buttonMode === "Leave volunteering")
      url = "http://localhost:5000/events/leave-volunteering";

    if (!user) openModal(<AuthenticationWrapper />);
    else {
      try {
        console.log(user.tokens[0].token);

        const response = await sendRequest(
          url,
          "PATCH",

          {
            user,
            event,
          },
          { Authorization: `Bearer ${user.tokens[0].token}` }
        );
        console.log(response);
        if (!error && response) {
          setEvent(response.data);
          dispatch(updateEventsList(response.data));
          if (url.includes("join")) {
            setButtonMode("Leave volunteering");
            setSubmittedMsg("You have successfully joined volunteering");
          } else {
            setButtonMode("I want to volunteer");
            setSubmittedMsg("You are no longer volunteering for this event");
          }
        }
      } catch (err) {
        console.log(err);
        console.log(error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 events-container marginB-3">
      {event ? (
        <>
          <EventItemPreview
            event={event}
            handleOnClick={handleOnClick}
            buttonText={buttonMode}
            loading={loading}
            submittedMsg={submittedMsg}
          />
          {error && <p className="error-msg center font-16">{error}</p>}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default EventPreview;
