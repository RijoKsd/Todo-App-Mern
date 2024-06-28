const express = require("express")
require("dotenv").config();
const connectDB = require('./config/db');
const authRouter = require("./routes/auth.route")

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/auth",authRouter);



const startServer = async()=>{
    try{
        await connectDB();
        app.listen(process.env.PORT,()=>{
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    }catch(err){
        console.error(err.message);
     }
}

startServer();

 
