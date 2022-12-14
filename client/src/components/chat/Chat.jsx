import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useChatDispatch } from "../../hooks/useChatDispatch";
import { socket } from "../../socket/socket.io";
import {
  addUser,
  appendMessage,
  setUsersInRoom,
} from "../../store/actions/chatAction";
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

// socket.on("message", (data) => {
//   //   store.dispatch(notTyping(data));
//   console.log(data);
//   const { username, message } = data;
//   // setMessages([...messages, { ...data }]);
//   //   dispatch(appendMessage({ username, eventId: event._id, message }));

//   useChatDispatch(appendMessage({ username, message }));
// });

const Chat = ({ event }) => {
  //   const message = useRef();
  const { user } = useSelector((state) => state.user);
  const { chat } = useSelector((state) => state);
  const [message, setMessage] = useState("");
  //   const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  //   const inputRef = useRef();

  //   socket.on("message", (data) => {
  //     //   store.dispatch(notTyping(data));
  //     const { username, message } = data;
  //     // setMessages([...messages, { ...data }]);
  //     dispatch(appendMessage({ username, eventId: event._id, message }));
  //   });

  //temp solution

  useEffect(() => {
    socket.on("message", (data) => {
      //   store.dispatch(notTyping(data));
      const { username, message, createdAt } = data;
      // setMessages([...messages, { ...data }]);
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
      console.log(data);
      // console.log("room data", data.users[event._id]);
      // dispatch(addUser({ username: data.username, eventId: event._id }));
      dispatch(setUsersInRoom({ users: data.data, eventId: event._id }));
      // console.log({ chat });
      // console.log(data);
      // console.log("test it", data.users.eventId);
      // setUsers(data.data);
    });
    // socket.on("users", (data) => {
    //   // console.log("sss", { data });
    //   // console.log(data)
    //   //   store.dispatch(notTyping(data));
    //   console.log(data);
    //   dispatch(addUser({ username: data.username, eventId: event._id }));

    //   setUsers([...users, data]);
    // });
    // socket.emit("userJoined", { username: user.name, eventId: event._id });
  }, [socket]);

  const sendMessage = () => {
    const data = {
      username: user.name,
      eventId: event._id,
      //   message: inputRef.current.value,
      message,
      createdAt: new Date().toLocaleString("en-il"),
    };
    socket.emit("sendMessage", data, (response) => {
      if (response.status === "ok") setMessage("");
    });
    // socket.emit("sendMessage", data, setMessage(""));
    // dispatch(appendMessage(data));
  };

  const handleOnChange = ({ target }) => {
    setMessage(target.value);
  };

  return (
    <div className="flex flex-col chat-container">
      <div className="users-messages-container">
        <div className="users-list">
          {" "}
          {chat.users[event._id]?.map((user, i) => {
            return (
              <div className="font-14 marginB-1" key={i}>
                <span className="">{user.username}</span>
              </div>
            );
          })}
          {/* {chat.users[event._id]?.map((user, i) => {
            console.log(user);
            return (
              <div className="font-14 marginB-1" key={i}>
                <span className="bold">{user.username}: </span>
              </div>
            );
          })} */}
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
      <div className="flex center sending-message-container">
        <Input
          placeholder="Your message..."
          onChange={handleOnChange}
          style={{ outline: "none" }}
          value={message}
        />
        {/* <input
          placeholder="Your message..."
          onChange={handleOnChange}
          ref={inputRef}
          style={{ outline: "none", padding: "2rem" }}
          //   value={message}
        /> */}
        <Button type="outline" onClick={sendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;
