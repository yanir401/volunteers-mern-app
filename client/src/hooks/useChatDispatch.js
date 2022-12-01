import { useDispatch } from "react-redux";

export const useChatDispatch = (action) => {
  const dispatch = useDispatch();

  return () => {
    dispatch(action);
  };
};
