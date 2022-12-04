import React from "react";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import Input from "../formElements/input/Input";
// import useOnclickOutside from "react-cool-onclickoutside";
import "./placesAutoComplete.css";

const PlacesAutoComplete = ({ onChange, error, setCoordinates }) => {
  //

  //

  //
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 500,
  });

  //
  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
    if (status === "OK") renderSuggestions();
  };
  //

  //
  const handleSelect =
    ({ description }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      onChange(description);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        setCoordinates({ lat, lng });
      });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={handleSelect(suggestion)}
          className="address-suggestion"
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  //

  return (
    <>
      <Input
        value={value}
        type="text"
        name={"address"}
        placeholder={"address"}
        onChange={handleInput}
        className={`${error && "input-error"} order-3`}
      />
      <ul style={{}}>{renderSuggestions()}</ul>
    </>
  );
};

export default PlacesAutoComplete;
