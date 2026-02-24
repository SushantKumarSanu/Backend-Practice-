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



export const loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email||!password) return res.status(422).json({message:"required fields are empty"});
        const user = await User.findOne({email}).select("+password");
        if(!user) return res.status(401).json({message:"You have entered wrong credentials"});
        const verifed = await user.comparePassword(password);
        if(!verifed) return res.status(401).json({message:"You have entered wrong credentials"});
        const token = generateToken(user._id);
        res.status(200).json({
            message:"login successfull",
            token:token,
            username:user.username,
            email:user.email
        })
    } catch (error) {
       console.error(error.message); 
    }
}