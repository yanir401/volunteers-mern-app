import React from "react";
import "./input.css";

const Input = (props) => {
  const { type, placeholder, value, name, className } = props;
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      className={`input ${className}`}
    />
  );
};

export default Input;
