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
  const { closeModalTimeOut } = useContext(ModalContext);
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
    const url = "/users/login";

    if (Object.keys(isErrors).length === 0)
      try {
        const response = await sendRequest(url, "POST", {
          email,
          password,
        });
        if (!response && !response?.statusText === "OK") {
          throw new Error(error);
        }
        dispatch(setUser(response.data.user));
        setSubmitted(true);
        closeModalTimeOut(1500);
      } catch (err) {
        console.log(error);
      }
  };

  const welcomeMsg = () => (
    <p className="text-center font-20">Welcome Back {user.name}!</p>
  );

  const signInForm = (
    <div className="text-center">
      <h2 className="marginB-2">{text}</h2>
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
        <span onClick={changeForm} className="font-16 pointer">
          Switch to Sign Up
        </span>
      </Form>
    </div>
  );

  if (loading) return <Spinner />;

  return <>{submitted ? welcomeMsg() : signInForm}</>;
};

export default SignIn;
