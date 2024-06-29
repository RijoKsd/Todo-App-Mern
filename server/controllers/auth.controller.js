const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const cloudinary = require("../utils/cloudinary.utils");
const generateJwtToken = require("../utils/generateToken");
const sendEmail = require("../utils/nodemailer.utils");
const crypto = require("crypto");
const otpModel = require("../models/otp.model");

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
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const otp = generateOTP();

    // expire otp after 1 minute
    const expireAt = new Date(Date.now() + 60 * 1000);

    // check if otp exists for email
    const otpExists = await otpModel.findOne({ email });
    if (otpExists) {
      await otpModel.findOneAndUpdate({ email }, { otp });
    } else {
      const newOtp = new otpModel({ email, otp });
      await newOtp.save();
    }
    await sendEmail(email, otp);

    return res.status(200).json({ message: "OTP sent to email", email,success:true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error", success:false });
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: "All fields are required", success:false });
  }
  try {
    const existingOtp = await otpModel.findOne({ email });
    if (!existingOtp) {
      return res.status(400).json({ message: "OTP does not exist for email", success:false });
    }
    if (existingOtp.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP", success:false });
    }

    // delete otp
    await otpModel.findOneAndDelete({ email });
    return res.status(200).json({ message: "OTP verified successfully", success:true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error", success:false });
  }
};
const resetPassword = async (req, res) => {
    const { email, password,  confirmPassword} = req.body;
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required", success:false });
    }
    try{
        const user = await userModel.findOne ({ email });
        if (!user){
            return res.status(400).json({ message: "User does not exist", success:false });
        }
        if(password.length < 6){
            return res.status(400).json({ message: "Password must be atleast 6 characters", success:false });
        }
        if (password !== confirmPassword){
            return res.status(400).json({ message: "Password do not match", success:false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await  user.updateOne({ password: hashedPassword });
        return res.status(200).json({ message: "Password reset successfully", success:true });
    }catch(err){
        console.error(err);
        return res.status(500).json({ message: "Server Error", success:false });
    }
};

module.exports = { register, login, verifyEmail, resetPassword, verifyOtp };
