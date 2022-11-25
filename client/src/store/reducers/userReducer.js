import { USER_ACTION_TYPE } from "../types/userType";

const initialState = {
  user: null,
  tempCoordinates: null,
  distance: 0,
};

export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPE.SET_USER:
      return { ...state, user: { ...state.user, ...payload } };

    case USER_ACTION_TYPE.TEMP_COORDINATES:
      return { ...state, tempCoordinates: payload };

    case USER_ACTION_TYPE.SET_DISTANCE:
      return { ...state, distance: payload };

    default:
      return state;
  }
};
