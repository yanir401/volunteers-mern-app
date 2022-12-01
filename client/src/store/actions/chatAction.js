import { CHAT_ACTION_TYPE } from "../types/chatType";

export const joinedUser = (user) => {
  return {
    type: CHAT_ACTION_TYPE.IS_JOINED,
    // payload: user,
  };
};

export const isTyping = (event) => {
  return {
    type: CHAT_ACTION_TYPE.IS_TYPING,
    // payload: event,
  };
};

export const appendMessage = (payload) => {
  return {
    type: CHAT_ACTION_TYPE.APPEND_MESSAGE,
    payload,
  };
};

export const addUser = (payload) => {
  console.log(payload);
  return {
    type: CHAT_ACTION_TYPE.ADD_USER,
    payload,
  };
};
export const getUsersInRoom = (payload) => {
  console.log(payload);
  return {
    type: CHAT_ACTION_TYPE.GET_USERS_IN_ROOM,
    payload,
  };
};
export const setUsersInRoom = (payload) => {
  return {
    type: CHAT_ACTION_TYPE.SET_USERS_IN_ROOM,
    payload,
  };
};
