import { useState } from "react";

const useToggle = () => {
  const [state, setState] = useState(false);

  const toggle = () => {
    setState((prev) => !prev);
    console.log(state);
  };

  return [state, toggle];
};

export default useToggle;
