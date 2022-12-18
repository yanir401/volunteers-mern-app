import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../store/actions/userActions";
import Button from "../../formElements/buttons/Button";
import Input from "../../formElements/input/Input";
import Newsletter from "../../layout/newsletter/Newsletter";
import LeadSection from "../../layout/leadSection/LeadSection";
import StartVolunteering from "../../layout/section/startVolunteering/StartVolunteering";
import UpComingEvents from "../../layout/section/upComingEvents/UpComingEvents";
import VolunteerStatics from "../../layout/section/volunteerStatistics/VolunteerStatistics";
import Modal from "../../UIElements/modal/Modal";

const Home = ({ upComingEvents }) => {
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <LeadSection />
      <UpComingEvents upComingEvents={upComingEvents} />
      {user ? <VolunteerStatics /> : <StartVolunteering />}
      <Newsletter />
    </>
  );
};

export default Home;
