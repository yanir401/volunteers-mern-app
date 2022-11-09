import { useContext, useEffect, useRef, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import axios from "axios";
import Events from "./components/pages/Events";
import CreateEvent from "./components/pages/CreateEvent";
import Profile from "./components/pages/Profile";
import Auth from "./components/pages/Auth";
import Header from "./components/layout/header/Header";
import Home from "./components/pages/home/Home";
import Footer from "./components/layout/footer/Footer";
import { useDispatch } from "react-redux";
import { closeModal } from "./store/actions/modalActions";
import { ModalContext } from "./context/modalContext";

function App() {
  const dispatch = useDispatch();
  const { closeModal } = useContext(ModalContext);

  const location = useLocation();

  useEffect(() => {
    closeModal();
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/new-event" element={<CreateEvent />} />{" "}
          {/*only if auth*/}
          <Route path="/events" element={<Events />} />
          <Route path="/my-profile" element={<Profile />} />
          <Route path="/auth" element={<Auth />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
