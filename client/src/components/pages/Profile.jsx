import React from "react";
import io from "socket.io-client";

const Profile = () => {
  const setEmit = () => {};
  return (
    <div style={{ paddingTop: "10rem" }}>
      <input type="text" />
      <button onClick={setEmit}>send</button>
    </div>
  );
};

export default Profile;
