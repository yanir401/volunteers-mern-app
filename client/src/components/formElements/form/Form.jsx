import React from "react";
import Button from "../buttons/Button";
import Input from "../input/Input";

const Form = ({ state, onChange, onSubmit, errors, children }) => {
  const renderInput = () => {
    return Object.keys(state).map((stateField) => (
      <div className="flex flex-col">
        <Input
          type={stateField || "text"}
          name={stateField}
          placeholder={stateField}
          onChange={onChange}
        />
        <span className="error-msg">
          {errors[stateField] && errors[stateField]}
        </span>
      </div>
    ));
  };

  return (
    <form className="flex flex-col gap-1-5 text-center">
      {renderInput()}
      {/* <div className="flex flex-col">
        <Input
          type="text"
          name="name"
          placeholder="Full name"
          onChange={onChange}
        />
        <span className="error-msg">{errors.name && errors.name}</span>
      </div>
      <div className="flex flex-col">
        <Input
          type="text"
          name="email"
          placeholder="Email address"
          onChange={onChange}
        />
        <span className="error-msg">{errors.email && errors.email}</span>
      </div>
      <div className="flex flex-col">
        <Input
          type="password"
          name="password"
          placeholder="Password"
          onChange={onChange}
        />
        <span className="error-msg">{errors.password && errors.password}</span>
      </div> */}
      {/* <p className="error-msg">{error}</p> */}

      {children}
    </form>
  );
};

export default Form;
