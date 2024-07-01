const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    image: {
      type: String,
      // required:true
    },
    password: {
      type: String,
      required: true,
    },
    // todo: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Todo",
    //   },
    // ],
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
