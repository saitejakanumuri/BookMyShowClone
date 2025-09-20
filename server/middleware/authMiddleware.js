const jwt = require("jsonwebtoken");

module.exports = function(req, res ,next){
    try{
        console.log("in middleware");
        
        const token = req.headers.authorization.split(" ")[1];
        // console.log("token from middleware", token, req.headers.authorization);
        
        const verifiedToken = jwt.verify(token, process.env.jwt_secret);
        // console.log("verifiedToken", verifiedToken);
        
        req.userId = verifiedToken.userId;
        next();
    }catch(err){
        // console.log(err);
        
        res.status(401).json({
            success: false,
            message: "Invalid token"
        })
    }
}