const mongoose = require("mongoose");


const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    }catch(err){
        console.error(err.message);
       /* The `process.exit(1);` statement in the code is used to exit the Node.js process with an
       error status code of 1. This indicates that the process is exiting due to an error condition.
       In this specific context, if there is an error connecting to the MongoDB database, the
       process will exit with a status code of 1, indicating that there was a failure in connecting
       to the database. */
        process.exit(1);
    }
}

module.exports = connectDB;