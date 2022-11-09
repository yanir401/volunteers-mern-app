import { MODAL_ACTION_TYPE } from "../types/modalType";

const initialState = {
  isOpen: false,
};

export const modalReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case MODAL_ACTION_TYPE.OPEN_MODAL:
      return { ...state, isOpen: true };
    case MODAL_ACTION_TYPE.CLOSE_MODAL:
      return { ...state, isOpen: false };

    default:
      return state;
  }
};
