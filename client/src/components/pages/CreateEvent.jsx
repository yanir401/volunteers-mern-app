import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useFetch } from "../../hooks/useFetch";
import Button from "../formElements/buttons/Button";
import Form from "../formElements/form/Form";

const defaultFormFields = {
  title: "",
  description: "",
  address: "",
  // file: "",
  date: new Date(),
  time: "",
};

const CreateEvent = ({ changeForm, text }) => {
  // const dispatch = useDispatch((state) => state.user);
  const { user } = useSelector((state) => state.user);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const [error, loading, sendRequest, clearError] = useFetch();
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const { title, description, data, time, address } = formFields;

  const handleOnChange = ({ target }) => {
    setErrors({});
    clearError();
    const { name, value } = target;
    setFormFields({ ...formFields, [name]: value });
    console.log(formFields);
  };

  const handleAsGuest = (e) => {
    e.preventDefault();
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:5000/events";

    try {
      const response = await sendRequest(url, "POST", formFields);
      console.log(response);
    } catch (err) {
      console.log(err);
      console.log(error);
    }
  };

  // const welcomeMsg = <p className="text-center font-20">Welcome {name}!</p>;

  const eventForm = (
    <div
      className="text-center form-container flex flex-col "
      style={{ paddingTop: "10rem", minHeight: "80rem" }}
    >
      <h2 className="marginTb-3">New Event</h2>
      <Form
        state={formFields}
        onChange={handleOnChange}
        onSubmit={handleOnSubmit}
        errors={errors}
      >
        <Button type="secondary">Create Event</Button>
      </Form>
    </div>
  );

  // if (loading) return <Spinner />;

  return <>{eventForm}</>;
};
export default CreateEvent;
