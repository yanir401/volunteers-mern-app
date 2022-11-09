import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const { user } = useSelector((state) => state.user);

  return (
    <>
      <LeadSection />
      <UpComingEvents />
      <StartVolunteering />
      <Newsletter />
    </>
  );
};

export default Home;
