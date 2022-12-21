import React from "react";
import { Link } from "react-router-dom";
import Button from "../../formElements/buttons/Button";
import Spinner from "../../UIElements/spinner/Spinner";
import "./eventItemPreview.css";
import { Buffer } from "buffer";

const EventItemPreview = ({
  event,
  handleOnClick,
  buttonText,
  loading,
  submittedMsg,
}) => {
  if (event.message)
    return (
      <div className="center marginT-2 flex-col gap-2">
        <h2>{event.message}</h2>
        <Link to="/events">
          <Button type="secondary">Back to events</Button>
        </Link>
      </div>
    );
  const img = new Buffer.from(event.file.data).toString("base64");
  return (
    <>
      <h2 className="text-center marginTb-2">{event.title}</h2>
      <div className="grid-col-2 center event-preview-inner-container grid-col-mobile">
        <div style={{ width: "100%", height: "100%" }}>
          <img
            src={
              img
                ? `data:image/png;base64,${img}`
                : "https://img.freepik.com/free-vector/people-volunteering-donating-money-items_53876-64646.jpg?w=2000"
            }
            alt=""
            // width={"100%"}
            // height="100%"
            className="event-image"
            // style={{ borderRadius: "5px 0 0 5px " }}
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
          <p>Date: {new Date(event.date).toLocaleDateString("en-IL")}</p>
          <p>Time: {event.time}</p>
          <p>
            <span>Currently volunteering: </span>
            {event?.volunteers?.length}
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
