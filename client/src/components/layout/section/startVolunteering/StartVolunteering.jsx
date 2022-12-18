import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { ModalContext } from "../../../../context/modalContext";
import AuthenticationWrapper from "../../../authentication/AuthenticationWrapper";
import Button from "../../../formElements/buttons/Button";

import "./startVolunteering.css";
const StartVolunteering = ({ setOpenModal }) => {
  const { openModal } = useContext(ModalContext);

  const dispatch = useDispatch();
  const handleOnClick = () => {
    openModal(<AuthenticationWrapper />);
  };

  return (
    <div style={{ position: "relative" }}>
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
    </div>
  );
};

export default StartVolunteering;
