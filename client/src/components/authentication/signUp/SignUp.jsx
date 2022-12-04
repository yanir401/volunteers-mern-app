import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ModalContext } from "../../../context/modalContext";
import { useFetch } from "../../../hooks/useFetch";
import { setUser } from "../../../store/actions/userActions";
import { isFormValid } from "../../../utils/formValidation/formValidation";
import Button from "../../formElements/buttons/Button";
import Form from "../../formElements/form/Form";
import Spinner from "../../UIElements/spinner/Spinner";

const defaultFormFields = {
  name: "",
  email: "",
  password: "",
};

const SignUp = ({ changeForm, text }) => {
  const dispatch = useDispatch((state) => state.user);
  const { openModal, closeModalTimeOut } = useContext(ModalContext);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [error, loading, sendRequest, clearError] = useFetch();
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

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

  useEffect(() => {
    console.log(error);
  }, [error]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const isErrors = isFormValid(formFields);
    setErrors(isErrors);
    const url = "/users/signup";

    if (Object.keys(isErrors).length === 0)
      try {
        const response = await sendRequest(url, "POST", {
          name,
          email,
          password,
        });
        if (!response) throw new Error(error);
        dispatch(setUser(response.data));
        setSubmitted(true);
        closeModalTimeOut(1500);
      } catch (err) {
        // console.log(err);
        console.log(error);
      }
  };

  const welcomeMsg = <p className="text-center font-20">Welcome {name}!</p>;

  const signUpForm = (
    <div className="text-center">
      <h2 className="marginB-2">{text}</h2>
      <Form
        state={formFields}
        onChange={handleOnChange}
        onSubmit={handleOnSubmit}
        errors={errors}
      >
        {error && <p className="error-msg">{error}</p>}

        <Button type="secondary" onClick={handleOnSubmit}>
          Sign Up
        </Button>
        <Button type="outline" onClick={handleAsGuest}>
          Continue as Guest
        </Button>
        <span onClick={changeForm} className="font-16 pointer">
          Switch to Sign In
        </span>
      </Form>
      {}
    </div>
  );

  if (loading) return <Spinner />;

  return <>{submitted ? welcomeMsg : signUpForm}</>;
};

export default SignUp;
