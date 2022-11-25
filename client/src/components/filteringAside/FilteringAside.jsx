import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./filteringAside.css";
import {
  setDistance,
  setTempCoordinates,
  setUser,
} from "../../store/actions/userActions";
import Input from "../formElements/input/Input";
import { searchEvent } from "../../store/actions/eventsAction";
import Button from "../formElements/buttons/Button";

const FilteringAside = () => {
  const dispatch = useDispatch();
  const { user, tempCoordinates, distance } = useSelector(
    (state) => state.user
  );

  // const [distance, setDistance] = useState(0);

  const getUserLocation = () => {
    const userLocation = navigator.geolocation.getCurrentPosition(
      (success) => {
        const {
          coords: { latitude, longitude },
        } = success;
        if (!user) {
          dispatch(setTempCoordinates({ lat: latitude, lng: longitude }));
        } else if (!user.coordinates)
          dispatch(setUser({ coordinates: { lat: latitude, lng: longitude } }));
      },
      (error) => console.log(error)
    );
  };

  const handleOnChange = (e) => {
    if (!tempCoordinates && !user?.coordinates) getUserLocation();
    dispatch(setDistance(e.target.value));
  };

  const handleSearchEvent = (e) => {
    dispatch(searchEvent(e.target.value));
  };

  const handleOnClick = () => dispatch(setDistance(0));

  return (
    <div className="flex flex-col paddingTb-4 gap-4 text-center aside-inner-container">
      <h4>Filter by distance</h4>

      <div className="gap-4 flex flex-col">
        <div className="flex flex-col center gap-2">
          <label className="font-16">
            Distance from your location: <br />
          </label>
          <p className="font-16 bold">
            {distance === 200 ? `${distance}+` : distance} km
          </p>
          <Input
            type="range"
            name=""
            id=""
            step={5}
            min="10"
            max="200"
            value={distance}
            onChange={handleOnChange}
          />
          <Button
            style={{
              height: "2rem",
              padding: "2rem",
              fontSize: "1.8rem",
              // color: "white",
              // background: "#babfcc",
            }}
            type="light"
            onClick={handleOnClick}
          >
            Clear filters
          </Button>
        </div>
        {/* <div>
          <Input placeholder="Filter by..." onChange={handleSearchEvent} />
        </div> */}
      </div>
    </div>
  );
};

export default FilteringAside;
