const authRouter = require("express").Router();
const { register, login, resetPassword,verifyEmail,verifyOtp } = require("../controllers/auth.controller")
const upload = require("../middleware/upload.middleware")

authRouter.post("/register",upload.single("image"), register);
authRouter.post("/login", login);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/verify-otp", verifyOtp);

module.exports = authRouter;