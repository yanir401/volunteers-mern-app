import React from "react";
import "./button.css";

const BUTTON_TYPE = {
  primary: "primary",
  secondary: "secondary",
  outline: "outline",
};

const Button = (props) => {
  const { children, onClick, type, style } = props;
  return (
    <button
      className={`button ${BUTTON_TYPE[type]} ${style} `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
