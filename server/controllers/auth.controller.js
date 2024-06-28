const userModel = require("../models/user.model");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
 const cloudinary = require("../utils/cloudinary.utils");
// https: cloudinary.uploader.upload(
//   "https://www.metal-am.com/wp-content/uploads/sites/4/2024/04/IMAG.jpg",
//   {
//     folder: "rijo",
//   }
// ); 

const register = async (req, res) => {};
const login = async (req, res) => {};
const resetPassword = async (req, res) => {};

module.exports = { register, login, resetPassword };
