const e = require("express");
const mongoose = require("mongoose");
const { create } = require("./user.model");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// after 5 minutes, delete otp
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 30 });

const Otp = mongoose.model("otp", otpSchema);
module.exports = Otp;
