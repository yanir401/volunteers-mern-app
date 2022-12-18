import { EVENTS_ACTION_TYPE } from "../types/eventsType";

export const eventReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case EVENTS_ACTION_TYPE.SET_EVENTS:
      return { ...state, events: payload };

    case EVENTS_ACTION_TYPE.ADD_EVENT:
      return { ...state, events: [...state.events, payload] };

    case EVENTS_ACTION_TYPE.UPDATE_EVENTS_LIST:
      return {
        ...state,
        events: state?.events?.map((event) => {
          if (event._id === payload._id) {
            return payload;
          }
          return event;
        }),
      };
    // return {
    //   ...state,
    //   events: [
    //     ...state.events.filter((event) => event._id !== payload._id),
    //     { ...payload },
    //   ],
    // };

    case EVENTS_ACTION_TYPE.GET_USER_EVENTS:
      return { ...state, subscriptionEvents: payload };

    case EVENTS_ACTION_TYPE.UPDATE_USER_EVENTS:
      return {
        ...state,
        subscriptionEvents: !state.subscriptionEvents
          ? [payload]
          : [...state.subscriptionEvents, payload],
      };

    case EVENTS_ACTION_TYPE.EVENT_QUERY:
      return { ...state, query: payload };

    default:
      return state;
  }
};
// state.messages[payload.eventId] = [
//   ...state.messages[payload.eventId],
//   { ...payload },
// ];
