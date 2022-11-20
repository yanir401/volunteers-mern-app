import React from "react";
import Button from "../../formElements/buttons/Button";
import Spinner from "../../UIElements/spinner/Spinner";
import "./eventItemPreview.css";

const EventItemPreview = ({
  event,
  handleOnClick,
  buttonText,
  loading,
  submittedMsg,
}) => {
  return (
    <>
      <h2 className="text-center marginTb-2">{event.title}</h2>
      <div className="grid-col-2 center event-preview-inner-container">
        <div style={{ width: "100%", height: "100%" }}>
          <img
            src={event.image}
            alt=""
            width={"100%"}
            height="100%"
            style={{ borderRadius: "5px 0 0 5px " }}
          />
        </div>
        <div className="font-18 flex flex-col gap-2 center event-right-content">
          <p>
            <span>Description:</span> {event.description}
          </p>
          <p>
            <span>Where: </span>
            {event.address}
          </p>
          <p>When: {event.time}</p>
          {event?.date && <p>{event.date}</p>}
          <p>
            <span>Currently volunteering: </span>
            {event.volunteers.length}
          </p>
        </div>
      </div>
      {submittedMsg && (
        <p className="text-center font-20 marginT-1">{submittedMsg}</p>
      )}
      <div className="center marginT-1">
        {loading ? (
          <Spinner />
        ) : (
          <Button type="secondary" onClick={handleOnClick}>
            {buttonText}
          </Button>
        )}
      </div>
    </>
  );
};

export default EventItemPreview;