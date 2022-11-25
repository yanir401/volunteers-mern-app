import React from "react";
import "./button.css";

const BUTTON_TYPE = {
  primary: "primary",
  secondary: "secondary",
  outline: "outline",
  light: "light",
};

const Button = (props) => {
  const { children, onClick, type, classStyle, style } = props;
  return (
    <button
      style={style}
      className={`button ${BUTTON_TYPE[type]} ${classStyle} `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
