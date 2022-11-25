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
      // validate(value) {
      //   if (!validator.isEmail(value)) {
      //     throw new Error("Invalid email!");
      //   }
      // },
    },
    //   phoneNumber: {
    //     type: String,
    //     unique: true,
    //     required: true,
    //     validate(str) {
    //       if (!validator.isMobilePhone(str, ["he-IL"])) {
    //         throw new Error("Invalid phone number!");
    //       }
    //     },
    //   },
    password: {
      type: String,
      required: true,
      minLength: 6,
      validate: [validator.isStrongPassword, "Please use a stronger password"],
    },

    // latLong: {
    //   type: [Number],
    //   // required: true,
    // },

    //   address: {
    //     type: String,
    //     // required: true,
    //     minLength: 3,
    //   },
    //   volunteerLocations: { type: String, required: true },
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
