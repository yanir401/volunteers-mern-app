import React from "react";
import "./input.css";

const Input = (props) => {
  const { type, placeholder, value, name, className, onChange } = props;
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      className={`input ${className}`}
      onChange={onChange}
    />
  );
};

export default Input;
