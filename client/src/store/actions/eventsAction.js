import { EVENTS_ACTION_TYPE } from "../types/eventsType";

export const fetchEvents = (events) => {
  return {
    type: EVENTS_ACTION_TYPE.SET_EVENTS,
    payload: events,
  };
};

export const addEvent = (event) => {
  return {
    type: EVENTS_ACTION_TYPE.ADD_EVENT,
    payload: event,
  };
};

export const updateEventsList = (event) => {
  return {
    type: EVENTS_ACTION_TYPE.UPDATE_EVENTS_LIST,
    payload: event,
  };
};

export const getUserEvents = (event) => {
  return {
    type: EVENTS_ACTION_TYPE.GET_USER_EVENTS,
    payload: event,
  };
};
export const setUserEvents = (event) => {
  return {
    type: EVENTS_ACTION_TYPE.SET_USER_EVENTS,
    payload: event,
  };
};
export const updateUserEvents = (event) => {
  return {
    type: EVENTS_ACTION_TYPE.UPDATE_USER_EVENTS,
    payload: event,
  };
};

export const searchEvent = (query) => {
  return {
    type: EVENTS_ACTION_TYPE.EVENT_QUERY,
    payload: query,
  };
};
