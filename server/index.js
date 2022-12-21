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
    // allowedHeaders: "*",
    // credentials: "*",
  },
});

app.use(express.json());

app.use(cors({ methods: "*" }));

const users = {};

io.on("connection", (socket) => {
  console.log("new connection ", socket.id);

  let currentUser;
  socket.on("userJoined", (data) => {
    console.log("new user", data);
    const { username, eventId, createdAt, userId } = data;
    currentUser = data;
    socket.join(eventId);

    if (!users[eventId]) users[eventId] = [];

    const isUserAlreadyInRoom = users[eventId].find(
      (user) => user.userId === userId
    );
    if (!isUserAlreadyInRoom)
      users[eventId] = [...users[eventId], { username, id: socket.id, userId }];

    io.to(eventId).emit("roomData", {
      data: users[eventId],
    });

    socket.broadcast.to(eventId).emit("message", {
      username: "Admin",
      message: username + "  has joined!",
      createdAt,
    });
  });

  socket.on("sendMessage", (data, callback) => {
    const { username, eventId, message, createdAt } = data;
    io.to(eventId).emit("message", { username, message, createdAt });
    callback({
      status: "ok",
    });
  });
  // ...

  socket.on("disconnect", () => {
    if (currentUser) {
      const { username, eventId, createdAt } = currentUser;

      io.to(eventId).emit("message", {
        username: "Admin",
        message: username + "  has left!",
        createdAt,
      });
    }
  });
});

app.use("/users", usersRouter);
app.use("/events", eventsRouter);
app.use(errorHandler);

httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`));
