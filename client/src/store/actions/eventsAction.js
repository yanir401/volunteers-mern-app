import { EVENTS_ACTION_TYPE } from "../types/eventsType";

export const fetchEvents = (events) => {
  return {
    type: EVENTS_ACTION_TYPE.SET_EVENTS,
    payload: events,
  };
};

export const getUserEvents = (event) => {
  return {
    type: EVENTS_ACTION_TYPE.GET_USER_EVENTS,
    payload: event,
  };
};
