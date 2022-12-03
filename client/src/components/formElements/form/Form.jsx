import React from "react";
import PlacesAutoComplete from "../../placesAutoComplete/PlacesAutoComplete";
import Input from "../input/Input";

const Form = ({
  state,
  onChange,
  onSubmit,
  errors,
  children,
  setCoordinates,
}) => {
  const renderInput = () => {
    return Object.keys(state).map((stateField) => (
      <div className="flex flex-col" key={stateField}>
        {stateField === "address" ? (
          <PlacesAutoComplete
            onChange={onChange}
            error={errors[stateField]}
            setCoordinates={setCoordinates}
          />
        ) : (
          <Input
            value={state[stateField]}
            type={stateField || "text"}
            name={stateField}
            placeholder={stateField}
            onChange={onChange}
            className={errors[stateField] && "input-error"}
          />
        )}

        <span className="error-msg">
          {errors[stateField] && errors[stateField]}
        </span>
      </div>
    ));
  };

  return (
    <form
      className="flex flex-col gap-1-5 text-center order "
      onSubmit={onSubmit}
    >
      {renderInput()}

      {children}
    </form>
  );
};

export default Form;
