const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const authRouter = require("./routes/auth.route");
const todoRouter = require("./routes/todo.route");
const cors = require("cors");

// #test
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", authRouter);
app.use("/api/todo", todoRouter);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error(err.message);
  }
};

startServer();
