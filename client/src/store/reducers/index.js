import { combineReducers } from "redux";
import { chatReducer } from "./chatReducer";
import { eventReducer } from "./eventReducer";
import { modalReducer } from "./modalReducer";
import { userReducer } from "./userReducer";

export const reducers = combineReducers({
  events: eventReducer,
  user: userReducer,
  modal: modalReducer,
  chat: chatReducer,
});
