import express from "express";
import { authorizeUser } from "../jwt-auth/protect.js";

const router = express.Router();


router.get('/profile',authorizeUser,(req,res)=>{
    const userId = req.userId
    res.status(200).json({message:"User is authorized",user:userId});
});



export default router;