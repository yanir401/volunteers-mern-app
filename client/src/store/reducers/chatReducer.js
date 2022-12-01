// APPEND_MESSAGE: "APPEND_MESSAGE",

import { CHAT_ACTION_TYPE } from "../types/chatType";

const initialState = {
  messages: {},
  users: {},
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
      if (!state.messages[payload.eventId])
        state.messages[payload.eventId] = [];

      state.messages[payload.eventId] = [
        ...state.messages[payload.eventId],
        { ...payload },
      ];

      //   tempMessages[payload.eventId].push(payload);

      //   state.messages[payload.eventId] = [
      //     ...state.messages[payload.eventId],
      //     { ...payload },
      //   ];

      //   state.messages[payload.eventId].push(payload.message);

      //   console.log([...state.messages]);

      return {
        ...state,
        // messages: [...state.messages, state.messages[payload.eventId]],
        // messages: tempMessages,
        messages: { ...state.messages },
      };

    case CHAT_ACTION_TYPE.IS_TYPING:
      return { ...state, typing: true };

    case CHAT_ACTION_TYPE.STOP_TYPING:
      return { ...state, typing: false };

    case CHAT_ACTION_TYPE.ADD_USER:
      if (!state.users[payload.eventId]) state.users[payload.eventId] = [];

      state.users[payload.eventId] = [
        ...state.users[payload.eventId],
        { ...payload },
      ];

      console.log(state.users);

      return { ...state, users: { ...state.users } };

    case CHAT_ACTION_TYPE.REMOVE_USER:
      return { ...state, joined: false };

    case CHAT_ACTION_TYPE.SET_USERS_IN_ROOM:
      state.users[payload.eventId] = payload.users;
      return { ...state, users: { ...state.users } };

    case CHAT_ACTION_TYPE.GET_USERS_IN_ROOM:
      return { ...state };

    default:
      return state;
  }
};
