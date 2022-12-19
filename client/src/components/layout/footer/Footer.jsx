import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Footer = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  return (
    <footer className="footer-container">
      <div className="grid-col-3 center">
        <img src={require("../../../assets/images/footer-image.jpg")} />

        <nav className="links">
          <Link to="/">Home</Link>
          <Link to="events">Events</Link>
          {user && (
            <>
              <Link to="subscriptions">My events</Link>
              <Link to="new-event">Create event</Link>
            </>
          )}
        </nav>
        <div className="links">
          <p>&copy; All rights reserved</p>
          <p>Yanir Ithzak </p>
          <p>Follow me:</p>
          Github,Linkedin
        </div>
      </div>
    </footer>
  );
};

export default Footer;
