const nodemailer = require("nodemailer");
const otpModel = require("../models/otp.model");

const sendEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const htmlContent = `
          <h1>Password Reset Request</h1>
      <p>Hello,</p>
      <p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
      <p>Please use the following OTP to reset your password. This OTP is valid for 5 minutes.</p>
      <h2>${otp}</h2>
      <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
      <p>Thank you!</p>
        
        `;

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "OTP for password reset",
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
   
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = sendEmail;
