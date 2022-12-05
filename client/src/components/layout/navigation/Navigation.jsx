import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import "./navigation.css";
import { openModal } from "../../../store/actions/modalActions";
import { CgMenuGridO } from "react-icons/cg";
import { ModalContext } from "../../../context/modalContext";
import SignUp from "../../authentication/signUp/SignUp";
import AuthenticationWrapper from "../../authentication/AuthenticationWrapper";
const Navigation = () => {
  const { openModal } = useContext(ModalContext);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const { pathname } = useLocation();
  useEffect(() => {
    setIsNavExpanded(false);
  }, [pathname]);
  // const authenticate = () => {
  //   return user ? <Link to="profile">Profile</Link> : <a> Sign in</a>;
  // };

  const handleOnClick = () => {
    setIsNavExpanded(false);

    openModal(<AuthenticationWrapper />);
  };

  const authenticate = (
    <>
      {user ? (
        <>
          <li>
            <Link to="subscriptions" className="gap-0-5">
              My Events
            </Link>
          </li>
          <li>
            <Link to="new-event" className="gap-0-5">
              Create Event
            </Link>
          </li>
          <li>
            <Link to="my-profile" className="gap-0-5">
              My Profile
              <CgProfile />
            </Link>
          </li>
        </>
      ) : (
        <a onClick={handleOnClick} className="pointer">
          {" "}
          Sign up
        </a>
      )}
    </>
  );

  const handleExpandedNavbar = () => {
    setIsNavExpanded(!isNavExpanded);
  };

  return (
    // <div className={"navbar"}>
    <div
      className="navbar"
      style={{
        opacity: isNavExpanded && "1",
      }}
    >
      <CgMenuGridO
        className="menu-mobile-icon"
        onClick={handleExpandedNavbar}
      />

      <h2>Logo</h2>
      <nav>
        <ul
          className={`links + ${
            isNavExpanded ? `openedMobileNavbar` : `closedMobileNavbar`
          }`}
        >
          {/* <ul className="links"> */}
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="events">Events</Link>
          </li>
          {authenticate}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
