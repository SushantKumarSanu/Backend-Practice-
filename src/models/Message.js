import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
    content : {
        type:String,
        required:true,
        trim:true
    },

    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat",
        required:true
    },

    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true

    },
    isCode:{
        type:Boolean,
        default:false
    },
    readBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},
{timestamps:true}
);

export default mongoose.Model("Message",messageSchema);