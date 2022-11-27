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

export const appendMessage = (message) => {
  return {
    type: CHAT_ACTION_TYPE.APPEND_MESSAGE,
    payload: message,
  };
};
