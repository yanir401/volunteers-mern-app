import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../socket/socket.io";
import { appendMessage, setUsersInRoom } from "../../store/actions/chatAction";
import Button from "../formElements/buttons/Button";
import Input from "../formElements/input/Input";
import "./chat.css";

const Chat = ({ event, visibility, setVisibility }) => {
  const { user } = useSelector((state) => state.user);
  const { chat } = useSelector((state) => state);
  const [message, setMessage] = useState("");
  const [chatVisible, setChatVisible] = useState(true);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  socket.on("online_users", (onlineUsers) => {
    setUsers(onlineUsers.data);
  });
  useEffect(() => {
    socket.on("message", (data) => {
      const { username, message, createdAt } = data;
      dispatch(
        appendMessage({ username, eventId: event._id, message, createdAt })
      );
    });

    socket.emit("userJoined", {
      username: user.name,
      eventId: event._id,
      createdAt: new Date().toLocaleString("en-il"),
      userId: user._id,
    });

    socket.on("roomData", (data) => {
      dispatch(setUsersInRoom({ users: data.data, eventId: event._id }));
    });
  }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim().length === 0) return;
    const data = {
      username: user.name,
      eventId: event._id,
      message,
      createdAt: new Date().toLocaleString("en-il"),
    };
    socket.emit("sendMessage", data, (response) => {
      if (response.status === "ok") setMessage("");
    });
  };

  const handleOnChange = ({ target }) => {
    setMessage(target.value);
  };

  const hideChat = () => {
    setVisibility(false);
  };

  return (
    <div
      className={
        visibility ? "chat-container flex flex-col" : "chat-container-hidden"
      }
    >
      <p className="text-center event-room-title font-22">
        {event.title.length > 12 ? event.title.slice(0, 35) : event.title}
        <span className="hide-chat" onClick={hideChat}>
          X
        </span>
      </p>
      <div className="users-messages-container">
        <div className="users-list">
          <p className="text-center font-18 bold marginB-1 users-list-title">
            Volunteers:{" "}
          </p>
          {chat.users[event._id]?.map((user, i) => {
            return (
              <div className="font-14 marginB-1" key={user.id}>
                <span className="">{user.username}</span>
              </div>
            );
          })}
        </div>
        <div className="view-messages-container">
          {chat.messages[event._id]?.map((msg, i) => {
            return (
              <div className="font-14 marginB-2" key={i}>
                <p className="meta bold">{msg.createdAt}</p>
                <span className="bold">{msg.username}: </span>
                <span>{msg.message}</span>
              </div>
            );
          })}
        </div>
      </div>
      <form
        className="flex center sending-message-container"
        onSubmit={sendMessage}
      >
        {" "}
        <Input
          placeholder="Your message..."
          onChange={handleOnChange}
          style={{ outline: "none" }}
          value={message}
        />
        <Button type="primary">Send</Button>
      </form>
    </div>
  );
};

export default Chat;
