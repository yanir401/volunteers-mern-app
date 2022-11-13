import mongoose from "mongoose";
import validator from "validator";

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 2,
    },
    description: {
      type: String,
      required: true,
      minLength: 4,
    },
    address: {
      type: String,
      required: true,
      minLength: 3,
    },
    date: {
      type: Date,
      //   required: true,
      minLength: 2,
      validate(value) {
        const today = new Date();
        if (value < today) throw new Error("Invalid Date!");
      },
    },
    time: {
      type: String,
      // required: true,
    },
    image: {
      type: String,
    },
    volunteers: [{ type: mongoose.Schema.Types.ObjectId }],

    // author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    author: { type: String },
  },
  { timestamps: true }
);

export { eventSchema };
