const authRouter = require("express").Router();
const { register, login, resetPassword } = require("../controllers/auth.controller")
const upload = require("../middleware/upload.middleware")

authRouter.post("/register",upload.single("image"), register);
authRouter.post("/login", login);
authRouter.post("/reset-password", resetPassword);

module.exports = authRouter;