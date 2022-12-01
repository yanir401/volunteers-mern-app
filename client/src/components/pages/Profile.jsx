import React from "react";
import io from "socket.io-client";

// const socket = io.connect("http://localhost:5000");
const Profile = () => {
  const setEmit = () => {
    // console.log(socket);
    console.log("first");
    // socket.emit("sendMessage", "test");
  };
  return (
    <div style={{ paddingTop: "10rem" }}>
      <input type="text" />
      <button onClick={setEmit}>send</button>
    </div>
  );
};

export default Profile;
