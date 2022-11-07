import React from "react";
import { useState } from "react";
import EventList from "../../events/EventList";
import Button from "../../formElements/buttons/Button";
import Input from "../../formElements/input/Input";
import Header from "../../layout/header/Header";
import Newsletter from "../../layout/newsletter/Newsletter";
import Section from "../../layout/section/Section";
import Modal from "../../UIElements/modal/Modal";
import "./home.css";
const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const exploreEvents = (
    <div className="explore-events">
      <div className="volunteer-statics">
        <h2 className="marginT-2">Start Volunteering</h2>
        <div className="statics">
          <div className="open-events ">
            <p>Open events</p>
            <p>50</p>
          </div>
          <div className="volunteers ">
            <p>Num of volunteers</p>
            <p>50</p>
          </div>
        </div>
      </div>
      <div className="full-width-high">
        <div className="explore-events-img"></div>
      </div>
      <div className="join-us-container center">
        <Button type="secondary" onClick={() => setOpenModal(true)}>
          Join Us
        </Button>
      </div>
    </div>
  );
  return (
    <>
      <Section />
      <div className="paddingTb-2 upcoming-events">
        <div className="container">
          <h2 className="center paddingTb-2" style={{ color: "#F8B24F" }}>
            Upcoming Events
          </h2>
          <div className="grid-col-3 font-16">
            <EventList limit={6} />
          </div>
        </div>
      </div>
      {exploreEvents}
      <Newsletter />
      <Modal show={openModal}>
        {/* <Input type="text" placeholder="Full name" /> */}
        <h2 style={{ color: "#fff" }}>Login</h2>
        <Input type="text" placeholder="Email address" />
        <Input type="text" placeholder="Password" />
        <Button type="secondary">Sign In</Button>
        <Button type="secondary">Continue as Guest</Button>
        <p className="font-16" style={{ color: "#fff" }}>
          Switch to Sign up
        </p>
      </Modal>
    </>
  );
};

export default Home;
