const mongoose = require("mongoose");
 
const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    expireAt: {
        type: Date,
        default: Date.now,
    },

}, { timestamps: true });

const Otp = mongoose.model("otp", otpSchema);
module.exports = Otp;
 