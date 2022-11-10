import axios from "axios";
import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { ModalContext } from "../../../context/modalContext";
import { useFetch } from "../../../hooks/useFetch";
import { setUser } from "../../../store/actions/userActions";
import { isFormValid } from "../../../utils/formValidation/formValidation";
import Button from "../../formElements/buttons/Button";
import Input from "../../formElements/input/Input";

const defaultFormFields = {
  name: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const dispatch = useDispatch((state) => state.user);
  const { openModal, closeModalTimeOut } = useContext(ModalContext);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [error, loading, sendRequest, clearError] = useFetch();
  const [errors, setErrors] = useState({});

  const { name, email, password } = formFields;

  const handleOnChange = ({ target }) => {
    setErrors({});
    clearError();
    const { name, value } = target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleAsGuest = (e) => {
    e.preventDefault();
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const isErrors = isFormValid(formFields);
    setErrors(isErrors);

    const url = "http://localhost:5000/users/signup";
    // const option = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, password, name }),
    // };

    // fetch(url, option)
    //   .then((response) => response.json())
    //   .then((user) => console.log(user))
    //   .catch((error) => console.log(error.message.message));

    if (Object.keys(isErrors).length === 0)
      try {
        const response = await sendRequest(url, "POST", {
          name,
          email,
          password,
        });
        console.log(response);
        dispatch(setUser({ email, password, name }));

        // dispatch(openModal());
        openModal(
          <h3
            style={{ color: "white", textAlign: "center", padding: "2rem" }}
            className="center"
          >
            Welcome {name}!
          </h3>
        );
        closeModalTimeOut(2000);
      } catch (err) {
        console.log(err);
        console.log(error);
      }
  };
  //   try {
  //     const res = await axios.post("http://localhost:5000/users/signup", {
  //       name,
  //       email,
  //       password,
  //     });
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const data = dispatch(setUser({ email, password, name }))
  //   .then((response) => response.json())
  //   .then((data) => console.log(data))
  //   .catch((err) => console.log(err));

  const signUpForm = (
    <form className="flex flex-col gap-1-5 text-center">
      <h2 style={{ color: "#fff" }}>Sign Up</h2>
      <div className="flex flex-col">
        <Input
          type="text"
          name="name"
          placeholder="Full name"
          onChange={handleOnChange}
        />
        <span className="error-msg">{errors.name && errors.name}</span>
      </div>
      <div className="flex flex-col">
        <Input
          type="text"
          name="email"
          placeholder="Email address"
          onChange={handleOnChange}
        />
        <span className="error-msg">{errors.email && errors.email}</span>
      </div>
      <div className="flex flex-col">
        <Input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleOnChange}
        />{" "}
        <span className="error-msg">{errors.password && errors.password}</span>
      </div>
      <p className="error-msg">{error}</p>
      <Button type="secondary" onClick={handleOnSubmit}>
        Sign Up
      </Button>
      <Button type="outline" onClick={handleAsGuest}>
        Continue as Guest
      </Button>
      <p className="font-16" style={{ color: "#fff" }}>
        Switch to Sign In
      </p>
    </form>
  );
  return <>{signUpForm}</>;
};

export default SignUp;
