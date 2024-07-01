const authRouter = require("express").Router();
const {
  register,
  login,
  resetPassword,
  verifyEmail,
  verifyOtp,
  checkAuth,
  updateUser,
} = require("../controllers/auth.controller");
const upload = require("../middleware/upload.middleware");
const verifyToken = require("../middleware/auth.middleware");

authRouter.post("/register", upload.single("image"), register);
authRouter.post("/login", login);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/verify-otp", verifyOtp);
authRouter.get("/check-auth", verifyToken, checkAuth);
authRouter.put("/update", verifyToken,upload.single("image"), updateUser)

module.exports = authRouter;
