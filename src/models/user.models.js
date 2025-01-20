import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

import { validateEmail } from "../utils/helper.js";

const userSchema = new Schema({
  avatar: {
    type: String,
    required: [true, "Avatar is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email is already in use"],
    validate: {
      validator: validateEmail,
      message: "Email is not valid",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const User = model("User", userSchema);
