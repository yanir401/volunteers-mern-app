import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
    },

    email: {
      type: String,
      index: true,
      unique: true,
      required: true,
      validate: [validator.isEmail, "Invalid email address"],
    },

    password: {
      type: String,
      required: true,
      minLength: 6,
      validate: [validator.isStrongPassword, "Please use a stronger password"],
    },

    coordinates: { lat: { type: Number }, lng: { type: Number } },
    volunteers: [{ type: mongoose.Types.ObjectId, ref: "Events" }],

    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export { userSchema };
