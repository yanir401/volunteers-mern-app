import { useContext, useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { Routes, Route, useLocation } from "react-router-dom";
import Events from "./components/pages/Events";
import CreateEvent from "./components/pages/CreateEvent";
import Profile from "./components/pages/Profile";
import Header from "./components/layout/header/Header";
import Home from "./components/pages/home/Home";
import Footer from "./components/layout/footer/Footer";
import { useDispatch } from "react-redux";
import { ModalContext } from "./context/modalContext";
import SubscriptionEvents from "./components/pages/SubscriptionEvents";
import EventPreview from "./components/pages/EventPreview";
import ProtectedRoutes from "./components/pages/routes/ProtectedRoutes";
import NotFound from "./components/pages/NotFound";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { setUser } from "./store/actions/userActions";

function App() {
  const dispatch = useDispatch();
  const { closeModal } = useContext(ModalContext);

  const [storedUser] = useLocalStorage("user", "");

  const location = useLocation();

  useEffect(() => {
    closeModal();
  }, [location.pathname]);

  const [sendRequest] = useFetch();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest("/events/upcoming-events", "GET");
        setEvents(res.data);
      } catch (err) {}
    };
    fetchData();
  }, [sendRequest]);

  useEffect(() => {
    if (storedUser) {
      dispatch(setUser(storedUser));
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home upComingEvents={events} />} />
          <Route path="/events" element={<Events />} />
          <Route path="event/:eventId" element={<EventPreview />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/new-event" element={<CreateEvent />} />
            <Route path="/subscriptions" element={<SubscriptionEvents />} />
            <Route path="/my-profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
