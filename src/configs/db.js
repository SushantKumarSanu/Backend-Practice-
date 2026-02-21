import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DataBase is connected');
    }catch(error){
        console.error("Cant connect to database as :",error);
    };
};


export default connectDB;