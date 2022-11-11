import React from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import Button from "../../formElements/buttons/Button";
import Navigation from "../navigation/Navigation";
import "./header.css";
const Header = () => {
  const { pathname } = useLocation();
  return (
    <>
      <Navigation />
      {pathname === "/" && (
        <div className="hero-image">
          <div className="hero-text gap-1">
            <h2>Volunteer For A Good Cause</h2>

            <Link to="events">
              <Button type="primary">Find volunteering</Button>
            </Link>
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default Header;
