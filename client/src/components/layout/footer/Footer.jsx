import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="grid-col-3 center">
        <img src={require("../../../assets/images/footer-image.jpg")} />

        <nav className="links">
          <Link>About us</Link>
          <br />
          <Link>About us</Link> <br />
          <Link>About us</Link> <br />
          <Link>About us</Link> <br />
        </nav>
        <div className="links">
          <p>&copy; All rights reserved</p>
          <br />
          <p>Yanir Ithzak </p>
          <p>Follow me:</p>
          Github,Linkedin
        </div>
      </div>
    </footer>
  );
};

export default Footer;
