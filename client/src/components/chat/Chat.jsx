import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { socket } from "../../socket/socket.io";
import Button from "../formElements/buttons/Button";
import Input from "../formElements/input/Input";
import "./chat.css";

// socket.on("joined", (welcome_gift) => {
//   store.dispatch(justJoined(welcome_gift.success));
// });

// socket.on("typing", (data) => {
//   store.dispatch(isTyping(data));
// });
// socket.on("chat", (data) => {
//   store.dispatch(appendMessage(data));
// });

// socket.on("no_typing", (data) => {
//   store.dispatch(notTyping(data));
// });

const Chat = ({ event }) => {
  //   const message = useRef();
  const { user } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  socket.on("message", (data) => {
    //   store.dispatch(notTyping(data));
    console.log(data);
    setMessages([...messages, { ...data }]);
  });

  socket.on("users", (data) => {
    //   store.dispatch(notTyping(data));
    setUsers([...users, data]);
  });

  useEffect(() => {
    console.log(user);
    socket.emit("userJoined", { username: user.name, eventId: event._id });
  }, []);

  const sendMessage = () => {
    socket.emit(
      "sendMessage",
      {
        username: user.name,
        eventId: event._id,
        message,
      },
      setMessage("")
    );
  };

  const handleOnChange = ({ target }) => {
    setMessage(target.value);
  };

  return (
    <div className="flex flex-col gap-2 chat-container">
      <div
        className="view-messages-container"
        style={{ padding: "0.5rem", overflow: "auto" }}
      >
        {messages?.map((msg) => {
          console.log(msg);
          return (
            <div className="font-14 marginB-1">
              <span>{new Date().toLocaleString("en-il")} </span>
              <span>{msg.username}: </span>
              <span>{msg.message}</span>
            </div>
          );
        })}
        {/* {users?.map((user) => {
          console.log(user);
          return (
            <div className="font-14 marginB-1">
              <p>{new Date().toLocaleString("en-il")} </p>
              <p>{`${user} has joined`} </p>
            </div>
          );
        })} */}
      </div>
      <div className="flex center sending-message-container">
        <Input
          placeholder="Your message..."
          onChange={handleOnChange}
          style={{ outline: "none" }}
          value={message}
        />
        <Button type="outline" onClick={sendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;
