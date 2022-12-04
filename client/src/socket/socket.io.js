import io from "socket.io-client";

const URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://volunteers-mern-app-backend.onrender.com";

export const socket = io.connect(URL);
