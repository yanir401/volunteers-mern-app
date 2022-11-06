import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../navigation/Navigation";
import "./header.css";
const Header = () => {
  return (
    <>
      <Navigation />
      <div className="hero-image">
        <div className="hero-text">
          <h2>Volunteer For A Good Cause</h2>

          <button>Start volunteering</button>
          <button>Explore Volunteers</button>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
