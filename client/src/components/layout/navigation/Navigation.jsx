import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./navigation.css";
const Navigation = () => {
  const { user } = useSelector((state) => state.user);

  // const authenticate = () => {
  //   return user ? <Link to="profile">Profile</Link> : <a> Sign in</a>;
  // };
  const authenticate = (
    <>{user ? <Link to="profile">Profile</Link> : <a> Sign in</a>}</>
  );

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
          <li>{authenticate}</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
