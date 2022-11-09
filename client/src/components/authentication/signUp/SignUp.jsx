import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/actions/userActions";
import Button from "../../formElements/buttons/Button";
import Input from "../../formElements/input/Input";

const SignUp = () => {
  const dispatch = useDispatch((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleOnClick = () => {
    dispatch(setUser({ email, password, fullName }));
  };
  const signUpForm = (
    <>
      <h2 style={{ color: "#fff" }}>Sign Up</h2>
      <Input
        type="text"
        placeholder="Full name"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Email address"
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        type="text"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="secondary" onClick={handleOnClick}>
        Sign Up
      </Button>
      <Button type="outline">Continue as Guest</Button>
      <p className="font-16" style={{ color: "#fff" }}>
        Switch to Sign In
      </p>
    </>
  );
  return <>{signUpForm}</>;
};

export default SignUp;
