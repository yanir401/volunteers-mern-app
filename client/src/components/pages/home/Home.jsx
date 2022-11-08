import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/actions/userActions";
import Button from "../../formElements/buttons/Button";
import Input from "../../formElements/input/Input";
import Newsletter from "../../layout/newsletter/Newsletter";
import LeadSection from "../../layout/section/LeadSection";
import StartVolunteering from "../../layout/section/startVolunteering/StartVolunteering";
import UpComingEvents from "../../layout/section/upComingEvents/UpComingEvents";
import Modal from "../../UIElements/modal/Modal";

const Home = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [openModal, setOpenModal] = useState(false);

  const handleOnClick = () => {
    dispatch(setUser({ email, password }));
  };

  const modalContent = (
    <>
      <h2 style={{ color: "#fff" }}>Login</h2>
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
        Sign In
      </Button>
      <Button type="outline">Continue as Guest</Button>
      <p className="font-16" style={{ color: "#fff" }}>
        Switch to Sign up
      </p>
    </>
  );

  return (
    <>
      <LeadSection />
      <UpComingEvents />
      <StartVolunteering setOpenModal={setOpenModal} />
      <Newsletter />
      <Modal show={openModal} closeModal={setOpenModal}>
        {modalContent}
      </Modal>
    </>
  );
};

export default Home;
