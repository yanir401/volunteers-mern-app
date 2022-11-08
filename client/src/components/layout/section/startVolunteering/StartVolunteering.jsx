import React from "react";
import Button from "../../../formElements/buttons/Button";

import "./startVolunteering.css";
const StartVolunteering = ({ setOpenModal }) => {
  const handleOnClick = () => {
    setOpenModal(true);
  };

  return (
    <div className="explore-events">
      <div className="volunteer-statics">
        <h2 className="marginT-2">Start Volunteering</h2>
        <div className="statics">
          <div className="open-events ">
            <p>Open events</p>
            <p>50</p>
          </div>
          <div className="volunteers ">
            <p>Num of volunteers</p>
            <p>50</p>
          </div>
        </div>
      </div>
      <div className="full-width-high">
        <div className="explore-events-img"></div>
      </div>
      <div className="join-us-container center">
        <Button type="outline" onClick={handleOnClick}>
          Join Us
        </Button>
      </div>
    </div>
  );
};

export default StartVolunteering;
