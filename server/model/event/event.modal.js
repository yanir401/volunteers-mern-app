import mongoose from "mongoose";
import { eventSchema } from "./event.schema.js";

export const Event = mongoose.model("Events", eventSchema);
