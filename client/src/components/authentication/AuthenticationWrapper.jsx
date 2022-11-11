import React, { useState } from "react";
import SignIn from "./signIn/SignIn";
import SignUp from "./signUp/SignUp";

const AuthenticationWrapper = () => {
  const [isSignInMode, setIsSignInMode] = useState(false);

  const changeToSignIn = () => {
    setIsSignInMode(true);
  };

  const changeToSignUp = () => {
    setIsSignInMode(false);
  };

  const form = (
    <>
      {isSignInMode ? (
        <SignIn changeForm={changeToSignUp} text="Sign In" />
      ) : (
        <SignUp changeForm={changeToSignIn} text="Sign Up" />
      )}
    </>
  );
  return form;
};

export default AuthenticationWrapper;
