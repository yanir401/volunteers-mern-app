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
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "./store/actions/modalActions";
import { ModalContext } from "./context/modalContext";
import { fetchEvents } from "./store/actions/eventsAction";
import SubscriptionEvents from "./components/pages/SubscriptionEvents";
import EventPreview from "./components/pages/EventPreview";
import ProtectedRoutes from "./components/pages/routes/ProtectedRoutes";
import NotFound from "./components/pages/NotFound";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { closeModal } = useContext(ModalContext);

  const location = useLocation();

  useEffect(() => {
    closeModal();
    console.log(process.env);
  }, [location.pathname]);

  const [error, loading, sendRequest] = useFetch();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          "http://localhost:5000/events/upcoming-events",
          "GET"
        );
        setEvents(res.data);
        dispatch(fetchEvents(res.data));
      } catch (err) {}
    };
    fetchData();
  }, [sendRequest]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await sendRequest("http://localhost:5000/events", "GET");
  //       setEvents(res.data);
  //       dispatch(fetchEvents(res.data));
  //     } catch (err) {}
  //   };
  //   fetchData();
  // }, [sendRequest]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="event/:eventId" element={<EventPreview />} />
          {/*only if auth*/}

          <Route element={<ProtectedRoutes />}>
            <Route path="/new-event" element={<CreateEvent />} />
            <Route path="/subscriptions" element={<SubscriptionEvents />} />
            <Route path="/my-profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />

          {/* <Route path="/auth" element={<Auth />} /> */}
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
