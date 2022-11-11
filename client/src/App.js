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
import { fetchEvents } from "./store/actions/eventsAction";
import SubscriptionEvents from "./components/pages/SubscriptionEvents";

function App() {
  const dispatch = useDispatch();
  const { closeModal } = useContext(ModalContext);

  const location = useLocation();

  useEffect(() => {
    closeModal();
  }, [location.pathname]);

  const [error, loading, sendRequest] = useFetch();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest("http://localhost:5000/events", "GET");
        setEvents(res.data);
        dispatch(fetchEvents(res.data));
      } catch (err) {}
    };
    fetchData();
  }, [sendRequest]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/new-event" element={<CreateEvent />} />
          {/*only if auth*/}
          <Route path="/subscriptions" element={<SubscriptionEvents />} />
          <Route path="/my-profile" element={<Profile />} />
          <Route path="/auth" element={<Auth />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
