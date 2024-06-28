const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary.utils");
const generateJwtToken = require("../utils/generateToken");
const sendEmail = require("../utils/nodemailer.utils");
const crypto = require("crypto");

const generateOTP = () => {
    return crypto.randomInt(100000, 1000000).toString();
}; 
 
const register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const image = req?.file?.path;
  if (!name || !email || !password || !image || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password do not match" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const imageResult = await cloudinary.uploader.upload(image, {
      folder: "TodoApp",
      tags: "todo-user",
    });

    const image_url = imageResult.secure_url;

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      image: image_url,
    });

    const currentUser = await newUser.save();
    const token = generateJwtToken(currentUser._id);

    return res
      .status(201)
      .json({ message: "User registered successfully", token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = generateJwtToken(user._id);
    return res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
const verifyEmail = async (req, res) => {
    const {email} = req.body;
};
const resetPassword = async (req, res) => {};

module.exports = { register, login, verifyEmail, resetPassword };
