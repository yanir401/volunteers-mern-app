import { MODAL_ACTION_TYPE } from "../types/modalType";

export const openModal = () => {
  console.log("run");
  return {
    type: MODAL_ACTION_TYPE.OPEN_MODAL,
    payload: true,
  };
};

export const closeModal = () => {
  return {
    type: MODAL_ACTION_TYPE.CLOSE_MODAL,
    payload: false,
  };
};
