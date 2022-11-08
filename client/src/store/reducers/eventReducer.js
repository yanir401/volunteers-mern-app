import { EVENTS_ACTION_TYPE } from "../types/eventsType";

export const eventReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case EVENTS_ACTION_TYPE.SET_EVENTS:
      return { ...state, events: payload };

    case EVENTS_ACTION_TYPE.GET_USER_EVENTS:
      return { ...state, subscriptionEvents: payload };

    default:
      return state;
  }
};
