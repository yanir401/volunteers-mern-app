import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useFetch } from "../../hooks/useFetch";
import { isCreateEventFormValid } from "../../utils/createEventValidation/eventFormValidation";
import Button from "../formElements/buttons/Button";
import Form from "../formElements/form/Form";
import Spinner from "../UIElements/spinner/Spinner";

const defaultFormFields = {
  title: "",
  description: "",
  address: "",
  // file: "",
  // coord: "",
  date: "",
  time: "",
};

const CreateEvent = ({ changeForm, text }) => {
  // const dispatch = useDispatch((state) => state.user);
  const { user } = useSelector((state) => state.user);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const [error, loading, sendRequest, clearError] = useFetch();
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [coordinates, setCoordinates] = useState(null);

  const { title, description, data, time, address } = formFields;

  const handleOnChange = (e) => {
    if (!e.target) {
      setFormFields({ ...formFields, address: e });
      return;
    }
    const {
      target: { name, value },
    } = e;
    setSubmitted(false);
    setErrors({});
    clearError();
    setFormFields({ ...formFields, [name]: value });
  };

  const handleAsGuest = (e) => {
    e.preventDefault();
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const isValidForm = isCreateEventFormValid(formFields);

    setErrors(isValidForm);

    if (Object.keys(isValidForm).length === 0) {
      const url = "http://localhost:5000/events";

      try {
        const response = await sendRequest(url, "POST", {
          formFields,
          coordinates,
          author: user._id,
        });
        if (response.status === 200) setSubmitted(true);
      } catch (err) {
        console.log(err);
        console.log(error);
      }
    }
  };

  const eventForm = (
    <div className="text-center form-container flex flex-col events-container">
      {submitted ? (
        <p className="success-msg">The event is created</p>
      ) : (
        <>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <h2 className="marginTb-3">New Event</h2>
              <Form
                state={formFields}
                onChange={handleOnChange}
                onSubmit={handleOnSubmit}
                errors={errors}
                setCoordinates={setCoordinates}
              >
                <Button type="secondary">Create Event</Button>
              </Form>
            </>
          )}
        </>
      )}
    </div>
  );

  // if (loading) return <Spinner />;
  return <>{eventForm}</>;
};
export default CreateEvent;
