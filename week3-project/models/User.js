const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    name: {
      type:String,
      required: [true, "User name is required"],
      trim: true,
    },
    email: {
      type:String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    phone: {
      type:String,
      match: [/^\+?[0-9]{7,15}$/, "Please use a valid phone number"],
    },
    address: {
      street: { type:String },
      city: { type:String },
      state: { type:String },
      zip: { type:String },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("user", user);
