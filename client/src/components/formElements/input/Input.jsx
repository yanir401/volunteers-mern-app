import React from "react";
import "./input.css";

const Input = (props) => {
  const {
    type,
    placeholder,
    value,
    name,
    className,
    onChange,
    ...anotherProps
  } = props;
  return (
    <input
      value={value}
      type={type}
      placeholder={placeholder}
      name={name}
      className={`input ${className}`}
      onChange={onChange}
      {...anotherProps}
    />
  );
};

export default Input;
