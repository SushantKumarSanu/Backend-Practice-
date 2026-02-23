import jwt from "jsonwebtoken";


export const generateToken = (userId)=>{
    return (
        jwt.sign({userId},
        process.env.JWT_SECRET,
        {algorithm: 'HS256' , expiresIn:'7d'}
    ))
};