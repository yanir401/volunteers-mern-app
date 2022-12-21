import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { ModalContext } from "../../context/modalContext";
import { useFetch } from "../../hooks/useFetch";
import {
  updateEventsList,
  updateUserEvents,
} from "../../store/actions/eventsAction";
import AuthenticationWrapper from "../authentication/AuthenticationWrapper";
import Chat from "../chat/Chat";
import EventItemPreview from "../events/eventPreview/EventItemPreview";
import Button from "../formElements/buttons/Button";
import Spinner from "../UIElements/spinner/Spinner";

const EventPreview = () => {
  const { openModal } = useContext(ModalContext);
  const { user } = useSelector((state) => state.user);
  const { events } = useSelector((state) => state.events);
  const [error, loading, sendRequest, clearError] = useFetch();
  const [submittedMsg, setSubmittedMsg] = useState("");
  const [event, setEvent] = useState();
  const [buttonMode, setButtonMode] = useState("I want to volunteer");
  const [openChat, setOpenChat] = useState(false);
  const { eventId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    const eventToRender = events?.find((event) => event._id === eventId);
    setEvent(eventToRender);

    if (!eventToRender) callEvent();

    if (user && isUserAlreadyVolunteering(eventToRender)) {
      setButtonMode("Leave volunteering");
    }
  }, [user]);

  const callEvent = async () => {
    try {
      const response = await sendRequest(`/events/event/${eventId}`, "GET");
      if (response.status !== 200) throw Error;
      setEvent(response.data);

      if (user && isUserAlreadyVolunteering(response.data))
        setButtonMode("Leave volunteering");
    } catch (error) {
      console.log(error);
    }
  };

  const isUserAlreadyVolunteering = (event) => {
    return !!event?.volunteers?.find((id) => id === user._id);
  };

  const handleOnClick = async () => {
    let url = "/events/join-volunteering";
    if (buttonMode === "Leave volunteering") url = "/events/leave-volunteering";
    if (!user) openModal(<AuthenticationWrapper />);
    else {
      try {
        const response = await sendRequest(
          url,
          "PATCH",
          { user, eventId: event._id },
          {
            Authorization: `Bearer ${user.tokens[0].token}`,
          }
        );
        if (!error && response) {
          setEvent(response.data);
          dispatch(updateUserEvents(response.data));
          dispatch(updateEventsList(response.data));

          if (url.includes("join")) {
            setButtonMode("Leave volunteering");
            setSubmittedMsg("You have successfully joined volunteering");
          } else {
            setButtonMode("I want to volunteer");
            setSubmittedMsg("You are no longer volunteering for this event");
            setOpenChat(false);
          }
        }
      } catch (err) {
        console.log(err);
        console.log(error);
      }
    }
  };

  const chat =
    buttonMode === "Leave volunteering" ? (
      <div className="flex center">
        {!openChat && (
          <Button type="primary" onClick={() => setOpenChat(true)}>
            Join to chat
          </Button>
        )}
      </div>
    ) : null;

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
          ></EventItemPreview>
          {chat}
          {openChat && (
            <Chat
              event={event}
              visibility={openChat}
              setVisibility={setOpenChat}
            />
          )}
          {error && <p className="error-msg center font-16">{error}</p>}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default EventPreview;
