import React from "react";

const NotFound = () => {
  return (
    <div className="events-container flex center flex-col gap-3">
      <div>
        <p className="font-80">Sorry</p>
        <p className="font-22 marginT-1">We couldn't find that page...</p>
      </div>
      <div
        className="image-container"
        style={{ width: "500px", height: "500px" }}
      >
        <img
          src={require("../../assets/images/404.jpg")}
          width="100%"
          style={{ borderRadius: "5%" }}
        />
      </div>
    </div>
  );
};

export default NotFound;
