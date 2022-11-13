import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalContext } from "../../../context/modalContext";
import { useFetch } from "../../../hooks/useFetch";
import { setUser } from "../../../store/actions/userActions";
import { isFormValid } from "../../../utils/formValidation/formValidation";
import Button from "../../formElements/buttons/Button";
import Form from "../../formElements/form/Form";
import Spinner from "../../UIElements/spinner/Spinner";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignIn = ({ changeForm, text }) => {
  const dispatch = useDispatch((state) => state.user);
  const { user } = useSelector((state) => state.user);

  const { openModal, closeModalTimeOut } = useContext(ModalContext);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [error, loading, sendRequest, clearError] = useFetch();
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const { email, password } = formFields;

  const handleOnChange = ({ target }) => {
    setErrors({});
    clearError();
    const { name, value } = target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const isErrors = isFormValid(formFields);
    setErrors(isErrors);
    const url = "http://localhost:5000/users/login";

    if (Object.keys(isErrors).length === 0)
      try {
        const response = await sendRequest(url, "POST", {
          email,
          password,
        });
        console.log(response);
        if (response.statusText === "OK") {
          console.log(response);
          dispatch(setUser(response.data.user));
          setSubmitted(true);
          closeModalTimeOut(1500);
        }
      } catch (err) {
        console.log(err);
        console.log(error);
      }
  };

  //   const welcomeMsg = (
  //     <p className="text-center font-20">Welcome {user.name}.</p>
  //   );

  const welcomeMsg = () => (
    <p className="text-center font-20">Welcome Back {user.name}!</p>
  );

  // const welcomeMsg = () =>
  //   openModal(<p style={{ color: "white" }}>Welcome {name}!</p>);

  // const signUpForm = (
  //   <form className="flex flex-col gap-1-5 text-center">
  //     <h2 style={{ color: "#fff" }}>Sign Up</h2>
  //     <div className="flex flex-col">
  //       <Input
  //         type="text"
  //         name="name"
  //         placeholder="Full name"
  //         onChange={handleOnChange}
  //       />
  //       <span className="error-msg">{errors.name && errors.name}</span>
  //     </div>
  //     <div className="flex flex-col">
  //       <Input
  //         type="text"
  //         name="email"
  //         placeholder="Email address"
  //         onChange={handleOnChange}
  //       />
  //       <span className="error-msg">{errors.email && errors.email}</span>
  //     </div>
  //     <div className="flex flex-col">
  //       <Input
  //         type="password"
  //         name="password"
  //         placeholder="Password"
  //         onChange={handleOnChange}
  //       />
  //       <span className="error-msg">{errors.password && errors.password}</span>
  //     </div>
  //     <p className="error-msg">{error}</p>
  //     <Button type="secondary" onClick={handleOnSubmit}>
  //       Sign Up
  //     </Button>
  //     <Button type="outline" onClick={handleAsGuest}>
  //       Continue as Guest
  //     </Button>
  //     <p className="font-16" style={{ color: "#fff" }}>
  //       Switch to Sign In
  //     </p>
  //   </form>
  // );

  const signInForm = (
    <div className="text-center">
      <h2 className="marginTb-1">{text}</h2>
      <Form
        state={formFields}
        onChange={handleOnChange}
        onSubmit={handleOnSubmit}
        errors={errors}
      >
        <Button type="secondary" onClick={handleOnSubmit}>
          {text}
        </Button>
        {error && <p className="error-msg">{error}</p>}
        <span onClick={changeForm} className="font-16">
          Switch to Sign Up
        </span>
      </Form>
    </div>
  );

  if (loading) return <Spinner />;

  return <>{submitted ? welcomeMsg() : signInForm}</>;
};

export default SignIn;
