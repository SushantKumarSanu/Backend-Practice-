import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    isGroup:{
        type:Boolean,
        default:false
    },
    groupName:{
        type:String,
        trim:true,
        required:function(){
            return this.isGroup;
        }
    },
    groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    lastMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    }
},
{timestamps:true}
)

export default mongoose.model('Chat',chatSchema);