import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Button from "../../formElements/buttons/Button";
import Navigation from "../navigation/Navigation";
import "./header.css";
const Header = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <>
      <Navigation />
      {pathname === "/" && (
        <div className="hero-image">
          <div className="hero-text">
            <h2>Volunteer For A Good Cause</h2>

            <Button type="primary">Start volunteering</Button>
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default Header;
