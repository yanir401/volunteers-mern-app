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
    style,
    ...anotherProps
  } = props;
  return (
    <input
      value={value}
      type={type}
      placeholder={placeholder}
      name={name}
      className={`input ${className}`}
      style={style}
      onChange={onChange}
      {...anotherProps}
    />
  );
};

export default Input;
