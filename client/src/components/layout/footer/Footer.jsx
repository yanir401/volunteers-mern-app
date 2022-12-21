import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineGithub, AiFillLinkedin } from "react-icons/ai";
const Footer = () => {
  const { user } = useSelector((state) => state.user);
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
          <p>Follow me on:</p>

          <a
            href="https://www.linkedin.com/in/yaniri/"
            target="_blank"
            className="flex center gap-1"
          >
            <AiFillLinkedin size={"3rem"} />
            Linkedin
          </a>
          <a
            href="https://github.com/yanir401"
            target="_blank"
            className="flex center gap-1"
          >
            <AiOutlineGithub size={"3rem"} />
            Github
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
