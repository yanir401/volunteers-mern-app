import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

console.log("object", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, (error, mongoConnectionInstance) => {
  if (error) throw Error("Mongoose Connection!, Error: " + error);
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    const { host, port, name } = mongoConnectionInstance;
    console.log({ host, port, name });
  }
});
