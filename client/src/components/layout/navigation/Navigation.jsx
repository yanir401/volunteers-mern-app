import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./navigation.css";
import { openModal } from "../../../store/actions/modalActions";
import { ModalContext } from "../../../context/modalContext";
import SignUp from "../../authentication/signUp/SignUp";
const Navigation = () => {
  const { openModal } = useContext(ModalContext);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // const authenticate = () => {
  //   return user ? <Link to="profile">Profile</Link> : <a> Sign in</a>;
  // };

  const handleOnClick = () => {
    // dispatch(openModal());
    openModal(<SignUp />);
  };
  const authenticate = (
    <>
      {user ? (
        <Link to="profile">Profile</Link>
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
          <li>{authenticate}</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
