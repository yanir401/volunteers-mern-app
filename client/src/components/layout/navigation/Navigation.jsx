import React from "react";
import { Link } from "react-router-dom";
import "./navigation.css";
const Navigation = () => {
  return (
    <div className="navbar">
      <h2>Logo</h2>
      <nav>
        <ul className="links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="events">Events</Link>
          </li>
          <li>
            <Link>Profile</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
