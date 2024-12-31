import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
    otp: {
      type: String,
      default: "",
    },
    otpExpiry:{
      type: Date,
      default: Date.now(),
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
