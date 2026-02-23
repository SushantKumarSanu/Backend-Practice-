import User from '../../models/User.js'
import { generateToken } from "../protect.js";



export const registerUser = async(req,res)=>{
    try{
    const {username,email,password} = req.body;
    if(!username||!email||!password) return res.status(422).json({message:"required fields are missing"});
    const user = await User.findOne({email});
    if(user) return res.status(409).json({message:"User already exists."});
    const createUser = await User.create({username,email,password});
    const token = generateToken(createUser._id);
    res.status(201).json({
        message:"User created successfully",
        token:token,
        username:createUser.username,
        email:createUser.email
    })
    }catch(error){
        console.error(error);
        console.log(error.stack);
    }
};