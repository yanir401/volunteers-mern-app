import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { usersRouter } from "./routes/users.routes.js";
import { eventsRouter } from "./routes/events.routes.js";
dotenv.config({ path: "../.env" });

const PORT = process.env.PORT || 5000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: "*",
  },
});

app.use(express.json());

app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

//   next();
// });

// console.log({ io });

io.on("connection", (socket) => {
  console.log("new connection ", socket.id);

  socket.on("userJoined", (data) => {
    const { username, eventId } = data;
    console.log(username);
    socket.join(eventId);
    // const joinMessage = `${username} has joined`;
    // io.to(eventId).emit("message", { username, message: "has joined" });

    socket.broadcast.to(eventId).emit("message", {
      username: "Admin",
      message: username + "  has joined!",
    });
  });

  socket.on("sendMessage", (data) => {
    console.log(data);
    const { username, eventId, message } = data;
    io.to(eventId).emit("message", { username, message });
  });
  // ...
});

// io.on("sendMessage");

app.use("/users", usersRouter);
app.use("/events", eventsRouter);
app.use(errorHandler);

httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`));
