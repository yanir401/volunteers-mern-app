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
  file: "",
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

  const { title, description, address, file, date, time } = formFields;

  const handleOnChange = (e) => {
    console.log(e);
    console.log(e.target);
    if (e?.target?.files?.length > 0) {
      setFormFields({ ...formFields, file: e.target.files[0] });
      return;
    }
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
      const formData = new FormData();
      console.log("ss", { formFields });
      formData.append("eventImage", formFields.file);
      // formData.append("test", "test it");
      formData.append("formFields", JSON.stringify(formFields));
      formData.append("coordinates", JSON.stringify(coordinates));
      formData.append("author", user._id);

      try {
        const response = await sendRequest(
          url,
          "POST",
          formData,
          // {
          //   formData,
          //   author: user._id,
          // },
          {
            Authorization: `Bearer ${user.tokens[0].token}`,
            // "Content-type": "multipart/form-data",
            // "Content-Type": "multipart/form-data",

            // "content-type": "image/png",
          }
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
    <div className="text-center flex flex-col form-container">
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
