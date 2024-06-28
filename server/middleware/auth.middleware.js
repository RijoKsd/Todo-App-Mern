const jwt = require('jsonwebtoken');

const verifyToken = async (req,res, next)=>{
    try{
        const header = req.header('Authorization');
        if(!header){
            return res.status(401).json({message:" Invalid authorization"}) 
        }
         const token = header.split(" ")[1];
        if(!token){
            return res.status(401).json({message:"No token, authorization denied"})
        }
        jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
            if(err){
                return res.status(401).json({message:"Token is not valid"})
            }
            req.user = user;
            console.log(req.user,"req.user");
            next();

        });
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error")
    }
}

module.exports = verifyToken;