import express from "express";
import "./config/db.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { usersRouter } from "./routes/users.routes.js";
import { eventsRouter } from "./routes/events.routes.js";
dotenv.config({ path: "../.env" });

const PORT = process.env.PORT || 5000;

const app = express();
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
app.use("/users", usersRouter);
app.use("/events", eventsRouter);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
