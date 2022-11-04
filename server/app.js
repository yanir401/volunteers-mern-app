import express from "express";
import { usersRouter } from "./routes/users.routes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import "./config/db.js";
import dotenv from "dotenv";
import { eventsRouter } from "./routes/events.routes.js";
dotenv.config({ path: "../.env" });

const PORT = process.env.PORT || 5000;
console.log(PORT);

const app = express();
app.use(express.json());

app.use("/users", usersRouter);
app.use("/events", eventsRouter);

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
