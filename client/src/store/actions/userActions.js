import { USER_ACTION_TYPE } from "../types/userType";

export const setUser = (user) => {
  return {
    type: USER_ACTION_TYPE.SET_USER,
    payload: user,
  };
};

export const setTempCoordinates = (coordinates) => {
  return {
    type: USER_ACTION_TYPE.TEMP_COORDINATES,
    payload: coordinates,
  };
};

export const setDistance = (distance) => {
  return {
    type: USER_ACTION_TYPE.SET_DISTANCE,
    payload: distance,
  };
};
