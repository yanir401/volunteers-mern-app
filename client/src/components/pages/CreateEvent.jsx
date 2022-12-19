import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { isCreateEventFormValid } from "../../utils/createEventValidation/eventFormValidation";
import Button from "../formElements/buttons/Button";
import Form from "../formElements/form/Form";
import Spinner from "../UIElements/spinner/Spinner";
import { addEvent } from "../../store/actions/eventsAction";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const defaultFormFields = {
  title: "",
  description: "",
  address: "",
  date: "",
  time: "",
};

const CreateEvent = () => {
  const [setValue] = useLocalStorage("user-events", "");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [error, loading, sendRequest, clearError] = useFetch();
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [event, setEvent] = useState(null);

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
      const url = "/events";

      try {
        const response = await sendRequest(
          url,
          "POST",
          {
            formFields,
            coordinates,
            author: user._id,
          },
          { Authorization: `Bearer ${user.tokens[0].token}` }
        );
        if (response.status === 200) {
          setSubmitted(true);
          setEvent(response.data);
          dispatch(addEvent(response.data));
          setValue(response.data);
        }
      } catch (err) {
        console.log(err);
        console.log(error);
      }
    }
  };

  const handleOnClick = () => {};

  const submittedContent = event && (
    <div className="flex flex-col center gap-4">
      <p className="success-msg">The event is created</p>
      <Link to={`/event/${event._id}`} state={{ event }}>
        <Button type="primary" onClick={handleOnClick}>
          View event
        </Button>
      </Link>
    </div>
  );

  const eventForm = (
    <div className="text-center form-container flex flex-col events-container">
      {submitted ? (
        submittedContent
      ) : (
        <>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <h2 className="marginTb-2">New Event</h2>
              <Form
                state={formFields}
                onChange={handleOnChange}
                onSubmit={handleOnSubmit}
                errors={errors}
                setCoordinates={setCoordinates}
              >
                <Button type="secondary" style={{ marginBottom: "2rem" }}>
                  Create Event
                </Button>
              </Form>
            </>
          )}
        </>
      )}
    </div>
  );

  return <>{eventForm}</>;
};
export default CreateEvent;
