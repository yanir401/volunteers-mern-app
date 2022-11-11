import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import "./navigation.css";
import { openModal } from "../../../store/actions/modalActions";
import { ModalContext } from "../../../context/modalContext";
import SignUp from "../../authentication/signUp/SignUp";
import AuthenticationWrapper from "../../authentication/AuthenticationWrapper";
const Navigation = () => {
  const { openModal } = useContext(ModalContext);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  console.log(user);

  // const authenticate = () => {
  //   return user ? <Link to="profile">Profile</Link> : <a> Sign in</a>;
  // };

  const handleOnClick = () => {
    // dispatch(openModal());
    openModal(<AuthenticationWrapper />);
  };
  const authenticate = (
    <>
      {user ? (
        <>
          <li>
            <Link to="new-event" className="gap-0-5">
              Create Event
            </Link>
          </li>
          <li>
            <Link to="profile" className="gap-0-5">
              My Profile
              <CgProfile />
            </Link>
          </li>
        </>
      ) : (
        <a onClick={handleOnClick}> Sign up</a>
      )}
    </>
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
          {authenticate}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
