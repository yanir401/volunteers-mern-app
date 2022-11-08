import { combineReducers } from "redux";
import { eventReducer } from "./eventReducer";
import { userReducer } from "./userReducer";

export const reducers = combineReducers({
  events: eventReducer,
  user: userReducer,
});
