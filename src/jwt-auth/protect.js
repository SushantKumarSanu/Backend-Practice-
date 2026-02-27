import jwt from "jsonwebtoken";
import User from "../models/User.js";


export const generateToken = (userId)=>{
    return (
        jwt.sign({userId},
        process.env.JWT_SECRET,
        {algorithm: 'HS256' , expiresIn:'7d'}
    ))
};

export const authorizeUser = async(req,res,next)=>{
    try{
    const authHeader = req.headers.authorization;
    if(!authHeader||!authHeader.startsWith('Bearer ')) return res.status(401).json({message:"User not authorized"});
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const userId = decoded.userId;
    const user = await User.findById(userId).select('_id').lean();
    if(!user) return res.status(401).json({message:"Your account is deleted"});
    req.userId = userId;
    next()
    }catch(error){
        if(error.name ==="JsonWebTokenError") return res.status(401).json({message:"Invalid token"})
        if(error.name === "TokenExpiredError") return res.status(401).json({message:"Need to login again"})
        return res.status(500).json({message:"internal server error"});    
    };
}