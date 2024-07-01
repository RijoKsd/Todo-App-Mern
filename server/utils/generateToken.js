const jwt = require("jsonwebtoken")

const generateJwtToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

module.exports = generateJwtToken;