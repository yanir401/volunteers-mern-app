import React from "react";
import "./volunteerStatics.css";
const VolunteerStatics = () => {
  return (
    <div style={{ position: "relative" }}>
      <div className="explore-events">
        <div className="volunteer-statics">
          <h2 className="marginT-2">Your statistics</h2>
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
          <div className="volunteer-statics-img"></div>
        </div>
        {/* <div className="join-us-container center">
          <Button type="outline" onClick={handleOnClick}>
            Join Us
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default VolunteerStatics;