// APPEND_MESSAGE: "APPEND_MESSAGE",

import { CHAT_ACTION_TYPE } from "../types/chatType";

const initialState = {
  messages: [],
  typing: false,
  joined: false,
};

export const chatReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHAT_ACTION_TYPE.IS_JOINED:
      return { ...state, joined: true };

    case CHAT_ACTION_TYPE.IS_LEFT:
      return { ...state, joined: false };

    case CHAT_ACTION_TYPE.APPEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, payload],
      };

    case CHAT_ACTION_TYPE.IS_TYPING:
      return { ...state, typing: true };

    case CHAT_ACTION_TYPE.STOP_TYPING:
      return { ...state, typing: false };

    default:
      return state;
  }
};
