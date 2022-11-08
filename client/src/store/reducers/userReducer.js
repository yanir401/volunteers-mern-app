import { USER_ACTION_TYPE } from "../types/userType";

const initialState = {
  user: null,
};

export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPE.SET_USER:
      return { ...state, user: payload };

    default:
      return state;
  }
};
