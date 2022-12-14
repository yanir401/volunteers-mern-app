import React, { useEffect, useState } from "react";
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
import { useFetch } from "../../hooks/useFetch";

const FilteringAside = () => {
  const dispatch = useDispatch();
  const [inputSearch, setInputSearch] = useState("");
  const [error, loading, sendRequest, clearError] = useFetch();
  const { user, tempCoordinates, distance } = useSelector(
    (state) => state.user
  );

  // const [distance, setDistance] = useState(0);

  const updateUserCoordinates = async (coordinates) => {
    const url = "/users/profile";

    try {
      const response = await sendRequest(url, "PATCH", coordinates, {
        Authorization: `Bearer ${user.tokens[0].token}`,
      });
      if (!response && !response?.statusText === "OK") {
        throw new Error(error);
      }
      // dispatch(setUser(response.data.user));
      // setSubmitted(true);
      // closeModalTimeOut(1500);
    } catch (err) {
      console.log(error);
    }
  };

  const getUserLocation = () => {
    const userLocation = navigator.geolocation.getCurrentPosition(
      (success) => {
        const {
          coords: { latitude, longitude },
        } = success;

        const lat = latitude;
        const lng = longitude;
        if (!user) {
          dispatch(setTempCoordinates({ lat, lng }));
        } else if (!user.coordinates) {
          dispatch(setUser({ coordinates: { lat, lng } }));
          updateUserCoordinates({ coordinates: { lat, lng } });
        }
      },
      (error) => console.log(error)
    );
  };

  useEffect(() => {
    console.log("component render");
  }, []);

  const handleOnChange = (e) => {
    if (!tempCoordinates && !user?.coordinates) getUserLocation();
    dispatch(setDistance(e.target.value));
  };

  const handleSearchEvent = (e) => {
    setInputSearch(e.target.value);
    dispatch(searchEvent(e.target.value));
  };

  const handleOnClick = () => {
    dispatch(setDistance(0));
    dispatch(searchEvent(""));
    setInputSearch("");
  };

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
            }}
            type="light"
            onClick={handleOnClick}
          >
            Clear filters
          </Button>
          <div>
            <Input
              placeholder="Filter by..."
              onChange={handleSearchEvent}
              value={inputSearch}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilteringAside;
